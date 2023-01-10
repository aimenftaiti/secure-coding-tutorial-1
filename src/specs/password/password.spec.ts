import * as chai from 'chai'
import { expect } from 'chai'
import * as chaiAsPromised from 'chai-as-promised'
import { PasswordValidation } from "../../lib/passwordValidation"

chai.use(chaiAsPromised)

describe('User', function () {
    describe('validations', function () {
        it('should return true for entropy > 80', () => {
            expect(PasswordValidation.isPasswordValid('x1yfw.AC&xu"BGh,-]4nsmrKF$Y8')).to.equal(true);
            expect(PasswordValidation.isPasswordValid('apsskie-nvqfnyjizzf-wwrptqqoifjt')).to.equal(true);
        });

    })
})
