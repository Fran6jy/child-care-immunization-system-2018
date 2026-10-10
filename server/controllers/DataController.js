const Admin = require('../models/adminModel');
const appdetails = require('../config/appdetails');
const moment = require('moment');
const Child = require('../models/childModel');
const Parent = require('../models/parentModel');
const Immunization = require('../models/immunizationModel');

module.exports = {
  getChildNo(req, res, next){
    Child.count({}).then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getParentNo(req, res, next) {
    Parent.count({}).then(function (data) {
      res.send({
        data: data
      });
    }).catch(function (error) {
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getImmunizationNo(req, res, next) {
    Immunization.count({}).then(function (data) {
      res.send({
        data: data
      });
    }).catch(function (error) {
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getActiveImmunizationNo(req, res, next) {
    Immunization.count({isActive: true}).then(function (data) {
      res.send({
        data: data
      });
    }).catch(function (error) {
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getChild(req, res, next){
    Child.find().then(function(data){
      res.send({
        data: data
      });
    }).catch(function(error){
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  }, 
  getParent(req, res, next) {
    Parent.find().then(function (data) {
      res.send({
        data: data
      });
    }).catch(function (error) {
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  getImmunization(req, res, next) {
    Immunization.find().then(function (data) {
      res.send({
        data: data
      });
    }).catch(function (error) {
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  }
};