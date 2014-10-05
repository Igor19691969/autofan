'use strict';
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
/**
 * User Schema
 */
var CustomSchema = new Schema({
    vin:String,
    model:String,
    name: String,
    email:String,
    phone:String,
    notes:String
});
mongoose.model('Custom', CustomSchema);

var JobTypeSchema = new Schema({
    name:String,
    ratio:{ type: Number, default: 1 }
});
mongoose.model('JobType', JobTypeSchema);

/*
var MasterSchema = new Schema({
    name:String
});
mongoose.model('Master', MasterSchema);
*/


var JobNameSchema = new Schema({
    name:String,
    norma:Number,
    jobType: {type : Schema.ObjectId, ref : 'JobType'}
});

mongoose.model('JobName', JobNameSchema);


var JobTicketSchema = new Schema({
    customer :{type : Schema.ObjectId, ref : 'Custom'},
    mile     :Number,
    date     : { type: Date, default: Date.now },
    dateClose:Date,
    resSum:Number,
    resPay:Number,
    jobs:[{
        name: String,
        norma:Number,
        q:Number,
        jobType: {type : Schema.ObjectId, ref : 'JobType'},
        date:Date,
        worker:{type : Schema.ObjectId, ref : 'Worker'},
        sum:Number
    }],
    sparks:[{
        name:String,
        code:String,
        price:Number,
        q:Number,
        shipPrice:Number,
        date:Date
    }],
    pay:[{
        date:Date,
        val:Number
    }],
    text:String

});

mongoose.model('JobTicket', JobTicketSchema);


var JobTicketSchemaArch = new Schema({
    customer :{type : Schema.ObjectId, ref : 'Custom'},
    mile     :Number,
    date     : { type: Date, default: Date.now },
    dateClose: { type: Date, default: Date.now },
    resSum:Number,
    resPay:Number,
    jobs:[{
        name: String,
        norma:Number,
        q:Number,
        jobType: {type : Schema.ObjectId, ref : 'JobType'},
        date:Date,
        worker:{type : Schema.ObjectId, ref : 'Worker'},
        sum:Number
    }],
    sparks:[{
        name:String,
        code:String,
        price:Number,
        q:Number,
        shipPrice:Number,
        date:Date
    }],
    pay:[{
        date:Date,
        val:Number
    }],
    text:String

});

mongoose.model('JobTicketArch', JobTicketSchemaArch);

var WorkerSchema = new Schema({
    name:String,
    ratio:{ type: Number, default: 0.5 }
});
mongoose.model('Worker', WorkerSchema);


