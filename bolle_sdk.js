"use strict";
const rp = require('request-promise').defaults({ jar: true });
const he = require('he');
class bolleClient {
    constructor(_username, _password) {
        this.username = _username;
        this.password = _password;
    }
    async login() {
        const tokens = await this.generate_csrf_and_bolle_token();
        const loginPost = {
            method: 'POST',
            uri: 'https://bolle.sophie-scholl-schule.eu',
            form: {
                username2: this.username,
                password2: this.password,
                _totp: '',
                _key: '',
                _csrf_token: tokens[0],
                _bolle: tokens[1],
            },
            headers: {},
        };
        await rp(loginPost)
            .then(() => { })
            .catch(() => { });
        await this.simpleBolleGETRequest();
    }
    async generate_csrf_and_bolle_token() {
        const get_csrf_token_option = {
            uri: 'https://bolle.sophie-scholl-schule.eu/',
            headers: {
                'User-Agent': 'Request-Promise',
            },
            json: true, // Automatically parses the JSON string in the response
        };
        const body = await rp(get_csrf_token_option);
        const tokenDiv = body.substring(body.indexOf('name="_csrf_token"'), body.indexOf('name="_csrf_token"') + 100);
        const tokenWith = tokenDiv.substring(tokenDiv.indexOf('value=') + 7);
        const csrf_token = tokenWith.substring(0, tokenWith.indexOf('"'));
        const bolletokenDiv = body.substring(body.indexOf('name="_bolle"'), body.indexOf('name="_bolle"') + 100);
        const bolletokenWith = bolletokenDiv.substring(bolletokenDiv.indexOf('value=') + 7);
        const bolle_token = bolletokenWith.substring(0, bolletokenWith.indexOf('"'));
        return [csrf_token, bolle_token];
    }
    async simpleBolleGETRequest() {
        const option = {
            uri: 'https://bolle.sophie-scholl-schule.eu/',
            headers: {
                'User-Agent': 'Request-Promise',
            },
            json: true,
        };
        const body = await rp(option);
        if (body.indexOf('Willkommen bei BOLLE') > 0) {
            console.log('Succesfully connected to Bolle!');
            return true;
        }
        else {
            console.log('Registration was not successful');
            return false;
        }
    }
    async loadProfil() {
        const profilController = {
            method: 'POST',
            uri: 'https://bolle.sophie-scholl-schule.eu/api/profilController',
            form: {
                method: 'profil_daten',
                payload: '{}',
            },
            headers: {},
        };
        const response = await rp(profilController);
        return JSON.parse(response);
    }
    async loadCourse(courseNummer) {
        const option = {
            uri: 'https://bolle.sophie-scholl-schule.eu/schueler_innen/kurs/' +
                courseNummer,
            headers: {
                'User-Agent': 'Request-Promise',
            },
            json: true,
        };
        const body = await rp(option);
        //console.log(JSON.parse(he.decode(getDataData(body))));
        const substrings = replaceAll(replaceAll(replaceAll(body, '\n', ''), 'sasdasd', 'sadasd'), 'iusdfgapsiduffg', 'sdfgsdfgsdfg').match(/(<div.*?<\/div>)/g);
        const divs = getWithStringsWith(substrings, 'schuelermitteilungen')
            .join('')
            .match(/(<.*?>)/g)[1]
            .match(/({.*?})/g);
        let allDiv = '';
        for (const str of divs)
            allDiv += str;
        //console.log(divs);
        //console.log(he.decode(allDiv));
        function replaceAll(str, subStr, replaceStr) {
            return str.split(subStr).join(replaceStr);
        }
        function getWithStringsWith(strs, subStr) {
            return strs
                .map((str) => (str.includes(subStr) ? str : ''))
                .filter((str) => str !== '');
        }
        function getDataData(_body) {
            const firstDataData = _body.substring(_body.indexOf('data-data="{&quot;eintraege&quot'));
            return firstDataData.substring(11, firstDataData.indexOf('</div>') - 13);
        }
        return JSON.parse(he.decode(getDataData(body)));
    }
}
async function test() {
    let bc = new bolleClient('typescript-max-mustermann', 'asdasd');
    await bc.login();
    let test = await bc.loadCourse(0);
    console.log(test.eintraege[0]); //nachname
}
module.exports.bolleClient = bolleClient;
