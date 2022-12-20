import { Mongo } from "meteor/mongo";

export const ShiftsList = new Mongo.Collection("shifts");
export const LeaveReqList = new Mongo.Collection("leaveReqs");
