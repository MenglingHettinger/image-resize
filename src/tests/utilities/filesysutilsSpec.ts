import fs from 'fs';
import { createDir, fileExisits } from '../../utilities/filesysutils';

describe('Test suite for fileExisits', () => {
    it('Checks that true returns when file is present.', ()=> {
        expect(fileExisits('./assets/tests/portraint.jpg')).toBe(true);
    });
    it('Checks that false returns when file is not present.', ()=> {
        expect(fileExisits('./assets/tests/portraint2.jpg')).toBe(false);
    });  
});

describe('Test suite for createDir', ()=> {
    const testDir = './assets/tests/test_createDir/';

    // Remove directory if it exisits already
    beforeEach(function () {
        if (fs.existsSync(testDir)) {
            fs.rmdirSync(testDir);
        }
    });
    // remove directory created
    afterEach(function () {
        if (fs.existsSync(testDir)) {
            fs.rmdirSync(testDir);
        }
    });
    it('Check that a directory is created.', ()=> {
        createDir(testDir);
        expect(fs.existsSync(testDir)).toBe(true);
    })

})