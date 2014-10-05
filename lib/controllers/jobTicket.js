'use strict';



var mongoose = require('mongoose'),
    async = require('async')
    ,JobTicket = mongoose.model('JobTicket');

var _ = require('underscore');

var ObjectId = require('mongoose').Types.ObjectId;

exports.list= function(req, res,nex) {
    var page =  (req.query && req.query.page && parseInt(req.query.page)>0)?parseInt(req.query.page):0;
    //var page = (req.params['page'] > 0 ? req.params['page'] : 1) - 1;
    var perPage = (req.query && req.query.perPage && parseInt(req.query.perPage)>0)?parseInt(req.query.perPage):20;
    var options = {
        perPage: perPage,
        page: page,
        criteria:null
    }
    JobTicket.find(options.criteria)
        .limit(options.perPage)
        .skip(options.perPage * options.page)
        .populate('customer')
        .select('customer date resSum resPay')
        .sort({'date': -1}) // sort by date
        .exec(function(err, docs) {
            if (err)  return next(err);
            if (page==0){
                JobTicket.count(options.criteria).exec(function (err, count) {
                    if (docs.length>0){
                        docs.unshift({'index':count});
                    }
                    return res.json(docs)
                })
            } else {
                return res.json(udocs)
            }
    })
}
exports.get= function(req, res,next) {
    JobTicket.findById(req.params.id)
        .populate('customer')
        .exec(function (err, result) {
            if (err) return next(err);
            res.json(result);
    });

}

exports.add= function(req, res,next) {
    console.log(req.body);
    //req.body.filters=JSON.stringify(req.body.filters);
    //console.log(req.body.filters);
//http://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
//How do I update/upsert a document in Mongoose?
    //return;
    var stuff = new JobTicket(req.body);

    var upsertData = stuff.toObject();
    console.log(upsertData);
    delete upsertData._id;
    JobTicket.update({_id: stuff.id}, upsertData, {upsert: true}, function (err) {
        if (err) return next(err);
        // saved!
        res.json({});
    })
}

exports.delete = function(req,res,next){
    JobTicket.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.json({});
    })
}

