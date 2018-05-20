const expect = require('chai').expect;
const { AdminApiWallMW } = require('../middlewares/auth');

describe('Admin Wall middleware ', function () {
  it('should call next if cookie is valid ', function (done) {
    const req = {
      cookies: {
        'admin-pass': '8319075c7587fe79b75b04f90a5ff0f0b00e27f5e9ecddf3dd5a33f65d60bf6d'
      }
    };
    let res = {
      endCalled: false,
      end: () => {
        res.endCalled = true;
      },
      statusValue: 200,
      status: (num) => {
        res.statusValue = num;
      }
    };
    let nextCalled = false;
    AdminApiWallMW(req, res, () => {
      nextCalled = true;
    });
    expect(res.statusValue).to.be.equal(200);
    expect(res.endCalled).to.be.equal(false);
    expect(nextCalled).to.be.equal(true);
    done();
  });
});

describe('Admin Wall middleware ', function () {
  it('should return 404 if cookie is invalid ', function (done) {
    const req = {
      cookies: {
        'admin-pass': 'not the right password'
      }
    };
    let res = {
      endCalled: false,
      end: () => {
        res.endCalled = true;
      },
      statusValue: 200,
      status: (num) => {
        res.statusValue = num;
      }
    };
    let nextCalled = false;
    AdminApiWallMW(req, res, () => {
      nextCalled = true;
    });
    expect(res.statusValue).to.be.equal(404);
    expect(res.endCalled).to.be.equal(true);
    expect(nextCalled).to.be.equal(true);
    done();
  });
});