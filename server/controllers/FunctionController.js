const Admin = require('../models/adminModel');
const appdetails = require('../config/appdetails');
const moment = require('moment');
const Child = require('../models/childModel');
const Parent = require('../models/parentModel');
const Immunization = require('../models/immunizationModel');

module.exports = {
  createParent(req, res, next) {
    var surname = req.body.surname;
    
    var otherNames = req.body.otherNames;
    var dob = req.body.dob;
    var address = req.body.address;
    var town = req.body.town;
    var street = req.body.street;
    var mobileNo = req.body.mobileNumber;
    var homeContactNumber = req.body.homeContactNumber;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    
    var parentDetails = {
      surname: surname,
      otherNames: otherNames,
      dob: dob,
      address: address,
      town: town,
      street: street, 
      mobileNo1: mobileNo,
      createdAt: createdAt,
      mobileNo2: homeContactNumber
    };

    Parent.findOne({mobileNo1: parentDetails.mobileNo1})
    .then(function(data){
      if(!data) {
        Parent.findOne({mobileNo2: parentDetails.mobileNo2})
        .then(function(data){
          if(!data) {
            var saveParent = new Parent(parentDetails);
            saveParent
              .save()
              .then(function(data) {
              console.log(data);
              res.send({
                success: 'Parent created successfully',
                entity: 'Parent',
                parentDetails: data
              });
            })
            .catch(function(error) {
              console.log(error.message);
              res.status(400).send({
                error: "Something went wrong"
              });
            });
          } else {
            res.status(400).send({
              error_parentError: "Home Contact Number is already registered"
            });
          }
        })
        .catch(function(error) {
          console.log(error);
          res.status(400).send(error);
        });
      } else {
        res.status(400).send({
          error_parentError: "Mobile Number is already registered"
        });
      }
    })
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    });
  },
  createChild(req, res, next) {
    var surname = req.body.surname;
    var otherNames = req.body.otherNames;
    var dob = req.body.dob;
    var parentID = req.body.parentID;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    var genotype = req.body.genotype;
    var bloodGroup = req.body.bloodGroup;
    var address = req.body.address

    var childDetails = {
      surname: surname,
      otherNames: otherNames,
      dob: dob,
      parentID: parentID,
      createdAt: createdAt,
      genotype: genotype,
      bloodGroup: bloodGroup,
      address: address
    };
    var saveToParent = {
      id: '',
      name: ''
    };
    var saveChild = new Child(childDetails);
    saveChild
      .save()
      .then(function(data) {
        console.log(data)
        saveToParent.id = data._id;
        saveToParent.name = childDetails.surname + " " + childDetails.otherNames;
        Parent.findOneAndUpdate({ _id: data.parentID}, {$push: { child: saveToParent}},
        function(error, success){
          if (error) {
            console.log(error.message);
            res.status(400).send({
              error: "Something went wrong"
            });
          } else {
            console.log(success)
            res.send({
              success: 'Child created successfully',
              entity: 'Child',
              childDetails: data
            });
          }
        });
    })
    .catch(function(error) {
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  createImmu(req, res, next) {
    var title = req.body.title;
    var type = req.body.type;
    var dose = req.body.dose;
    var desc = req.body.desc;
    var notes = req.body.notes;
    var createdAt = moment().format("dddd, MMMM Do YYYY, h:mm:ss a");
    
    var immuDetails = {
      title: title,
      type: type,
      dose: dose,
      desc: desc,
      notes: notes,
      createdAt: createdAt
    };

    var saveImmu = new Immunization(immuDetails);
    saveImmu
    
      .save()
      .then(function(data) {
      console.log(data);
      res.send({
        success: 'Immunization created successfully',
        entity: 'Immunization',
        childDetails: data
      });
    })
    .catch(function(error) {
      console.log(error.message);
      res.status(400).send({
        error: "Something went wrong"
      });
    });
  },
  linkImmu(req, res, next) {
    var immuId  = req.body.immuId;
    var childId = req.body.childId;
    
    var Details = {
      immuId: immuId,
      childId: childId
    };

    Immunization.findOne({_id: Details.immuId})
    .then(function(data){
      data.registeredChid.push(Details.childId);
      data.save()
      console.log(data)
      
      Child.findOne({_id: Details.childId})
      .then(function(data){
        data.recieved.push(Details.childId);
        data.save()
        console.log(data)
        res.send({
          success: 'Assingned successfully',
          entity: 'Child'
        });
      })
    })
    .catch(function(error) {
      console.log(error);
      res.status(400).send(error);
    });
   
  }
};