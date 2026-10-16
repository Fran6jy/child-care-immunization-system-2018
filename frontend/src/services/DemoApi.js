// Public archive demo: all records are fictional and stay in this browser tab.
// This module deliberately makes no network requests and persists no records.
const parentId = '000000000000000000000001'
const childId = '000000000000000000000002'
const vaccineId = '000000000000000000000003'
const state = {
  parents: [{
    _id: parentId, surname: 'Demo', otherNames: 'Parent', dob: '1990-01-01',
    town: 'Sample Town', address: '1 Example Street', mobileNo1: '00000000000',
    mobileNo2: '00000000001', child: [{id: childId, name: 'Demo Child'}]
  }],
  children: [{
    _id: childId, surname: 'Demo', otherNames: 'Child', dob: '2024-01-01',
    parentID: parentId, bloodGroup: 'O+', genotype: 'AA',
    address: '1 Example Street', recieved: [{_immuId: vaccineId, date: 'Demo date'}]
  }],
  immunizations: [{
    _id: vaccineId, title: 'Sample Vaccine A (fictional)', type: 'Demo', dose: 1,
    note: 'Demonstration only', desc: 'Fictional record for exploring the 2018 UI',
    isActive: true, registeredChid: [childId], createdAt: 'Demo date'
  }]
}
let nextId = 4
function id () { return ('000000000000000000000000' + nextId++).slice(-24) }
function ok (data) { return Promise.resolve({data}) }
function fail (data) { return Promise.reject({response: {data}}) }

export default function DemoApi () {
  return {
    get (path) {
      switch (path) {
        case 'getchildno': return ok({data: state.children.length})
        case 'getparentno': return ok({data: state.parents.length})
        case 'getimmuno': return ok({data: state.immunizations.length})
        case 'getactiveimmuno': return ok({data: state.immunizations.filter(x => x.isActive).length})
        case 'getchild': return ok({data: state.children.slice()})
        case 'getparent': return ok({data: state.parents.slice()})
        case 'getimmu': return ok({data: state.immunizations.slice()})
        default: return fail({error: 'Unknown demo route'})
      }
    },
    post (path, body) {
      if (path === 'adminlogin') {
        if (body.email !== 'demo@example.test' || body.password !== 'DemoPass2018!') {
          return fail({error_Email: 'Use the fictional demo login shown above'})
        }
        return ok({
          success: 'Demo authentication successful', token: 'fictional-demo-token',
          adminDetails: {
            _id: '000000000000000000000099', fullName: 'Demo Administrator',
            email: 'demo@example.test', privilege: 'demo', createdAt: '2018 archive demo'
          }
        })
      }
      if (path === 'adminpassupdate') {
        return ok({success: 'Demo only: password was not changed'})
      }
      if (path === 'addparents') {
        const parent = Object.assign({}, body, {
          _id: id(), mobileNo1: body.mobileNumber, mobileNo2: body.homeContactNumber,
          child: []
        })
        state.parents.push(parent)
        return ok({success: 'Parent created in this demo tab', parentDetails: parent})
      }
      if (path === 'addchild') {
        const child = Object.assign({}, body, {_id: id(), recieved: []})
        state.children.push(child)
        const parent = state.parents.find(x => x._id === body.parentID)
        if (parent) parent.child.push({id: child._id, name: child.surname + ' ' + child.otherNames})
        return ok({success: 'Child created in this demo tab', childDetails: child})
      }
      if (path === 'addimmu') {
        const immunization = Object.assign({}, body, {
          _id: id(), isActive: true, registeredChid: [],
          createdAt: 'Demo session', notes: body.note
        })
        state.immunizations.push(immunization)
        return ok({success: 'Immunization created in this demo tab', childDetails: immunization})
      }
      if (path === 'linkimmu') {
        const child = state.children.find(x => x._id === body.childId)
        const immunization = state.immunizations.find(x => x._id === body.immuId)
        if (!child || !immunization) return fail({error: 'Choose a child and immunization'})
        child.recieved.push({_immuId: immunization._id, date: 'Demo session'})
        immunization.registeredChid.push(child._id)
        return ok({success: 'Assigned in this demo tab'})
      }
      return fail({error: 'Unknown demo route'})
    }
  }
}
