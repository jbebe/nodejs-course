const expect = require('chai').expect;
const { ApiLoginAdminMW } = require('../middlewares/auth');
const { AdminPassword } = require("../config");

describe('Admin Login middleware ', function () {
  it('should return a cookie if password is valid ', function (done) {
    const req = {
      body: {
        password: AdminPassword
      }
    };
    let res = {
      cookieObj: {},
      cookie: (name, value) => {
        res.cookieObj[name] = value;
      },
      endCalled: false,
      end: () => {
        res.endCalled = true;
      },
      statusValue: 200,
      status: (num) => {
        res.statusValue = num;
      }
    };
    ApiLoginAdminMW(req, res);
    expect(res.cookieObj).to.have.property('admin-pass');
    expect(res.cookieObj['admin-pass']).to.be.equal('8319075c7587fe79b75b04f90a5ff0f0b00e27f5e9ecddf3dd5a33f65d60bf6d');
    expect(res.statusValue).to.be.equal(200);
    expect(res.endCalled).to.be.equal(true);
    done();
  });
});

describe('Admin Login middleware ', function () {
  it('should return 404 error if password is invalid ', function (done) {
    const req = {
      body: {
        password: 'not the right password'
      }
    };
    let res = {
      cookieObj: {},
      cookie: (name, value) => {
        res.cookieObj[name] = value;
      },
      endCalled: false,
      end: () => {
        res.endCalled = true;
      },
      statusValue: 200,
      status: (num) => {
        res.statusValue = num;
      }
    };
    ApiLoginAdminMW(req, res);
    expect(res.statusValue).to.be.equal(404);
    expect(res.endCalled).to.be.equal(true);
    done();
  });
});
