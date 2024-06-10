const express = require("express");
const billTrackerRouter = express.Router();
const BillTracker = require("../models/billtracker.js");

let error;
billTrackerRouter.route("/")
    .get(async (req, res, next) => {
        try {
            const allBillTrackers = await BillTracker.find({});
            res.status(200).send(allBillTrackers);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    })
    .post(async (req, res, next) => {
        try {
            req.body.user = req.auth._id;
            const newBillTracker = new BillTracker(req.body);
            await newBillTracker.save();
            res.status(201).send(newBillTracker);
        }
        catch (err) {
            error = err.message;
            return next(error);
        }
    });

billTrackerRouter.route("/user")
    .get(async (req, res, next) => {
        try {
            const userBillTrackers = await BillTracker.find({ user: req.auth._id });
            res.status(200).send(userBillTrackers);
        }
        catch (err) {
            error = err;
            res.status(500).send({ err: error });
            return next(err);
        }
    });

billTrackerRouter.route("/:billTrackerId")
    .get(async (req, res, next) => {
        try {
            const billTrackerId = req.params.billTrackerId;
            const billTracker = await BillTracker.findOne({ _id: billTrackerId, user: req.auth._id });
            res.status(200).send(billTracker);
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `billTrackerId: ${req.params.billTrackerId} is invalid, Please provide the valid billTrackerId parameter`
            });
        }

    })

    .put(async (req, res, next) => {
        try {
            const billTrackerId = req.params.billTrackerId;
            const updatedBillTracker = await BillTracker.findOneAndUpdate({ _id: billTrackerId, user: req.auth._id }, req.body);
            res.status(201).send(updatedBillTracker);
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `billTrackerId: ${req.params.billTrackerId} is invalid, Please provide the valid billTrackerId parameter`
            });
        }
    })

    .delete(async (req, res, next) => {
        try {
            const billTrackerId = req.params.billTrackerId;
            await BillTracker.findOneAndDelete({ _id: billTrackerId, user: req.auth._id });
            res.send("Successfully deleted a bill tracker from the database!");
        }
        catch (err) {
            error = err.message;
            return next({
                err: error,
                errMsg: `billTrackerId: ${req.params.billTrackerId} is invalid, Please provide the valid billTrackerId parameter`
            });
        }
    });

module.exports = billTrackerRouter