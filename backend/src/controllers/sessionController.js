const Session = require("../models/sessionModel");

// Start Therapy Session
const startSession = async (req, res, next) => {
  try {
    const { mode } = req.body;

    if (!mode) {
      return res.status(400).json({
        success: false,
        message: "Therapy mode is required",
      });
    }

    const session = await Session.create({
      user: req.user._id,
      mode,
      status: "active",
      startTime: new Date(),
    });

    res.status(201).json({
      success: true,
      message: "Therapy session started successfully",
      session,
    });

  } catch (error) {
    next(error);
  }
};

//stop therapy session
const stopSession = async (req, res, next) => {
  try {
    const { feedback } = req.body;

    const session = await Session.findOne({
      user: req.user._id,
      status: "active",
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "No active session found",
      });
    }

    session.endTime = new Date();

    session.duration = Math.floor(
      (session.endTime - session.startTime) / 1000
    );

    session.feedback = feedback || "";

    session.status = "completed";

    await session.save();

    res.status(200).json({
      success: true,
      message: "Therapy session completed",
      session,
    });

  } catch (error) {
    next(error);
  }
};

//get history 
const getHistory = async (req, res, next) => {
  try {
    const sessions = await Session.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      count: sessions.length,
      sessions,
    });

  } catch (error) {
    next(error);
  }
};



// Get Single Therapy Session
const getSessionById = async (req, res, next) => {
  try {
    const session = await Session.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!session) {
      return res.status(404).json({
        success: false,
        message: "Session not found"
      });
    }

    res.status(200).json({
      success: true,
      session
    });

  } catch (error) {
    next(error);
}
};




module.exports = {
  startSession,
  stopSession,
  getHistory,
  getSessionById,
  
};