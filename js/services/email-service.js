import utils from './utiles-service.js';
const EMAIL_KEY ='saved_emails';
var emails = [ {
               "id": "OXeMG",
               "from" : "ariel.zahav",
               "subject": "unix", 
               "body": "hi", 
               "isRead": false, 
               "sentAt": 1530797138},
               {

                "id": "JYOJa",
                "from" : "ariel.cohen@gmail.com",
                "subject": "js", 
                "body": "hi", 
                "isRead": false, 
                "sentAt": 1530797128},
                {
                "id": "1y0Oq",
                "from" : "matan.t@gmail.com",
                "subject": "css", 
                "body": "hi", 
                "isRead": true, 
                "sentAt": 1530797118},
                {
                 "id": "JYHJa",
                 "from" : "orit123v@walla.com",
                 "subject": "css and html", 
                "body": "hi", 
                "isRead": true, 
                "sentAt": 1530797098},
                {
                "id": "1y9Oq",
                "from" : "yaron.b@gmail.com",
                "subject": "html", 
                "body": "hi", 
                "isRead": true, 
                "sentAt": 1530797088},
            ];

function emptyEmail() {
    return { 
           "id": "",
           "from" : "ariel.zahav@gmail.com",
           "subject": "", 
           "body": "", 
           "isRead": false, 
            "sentAt":0
    }
}

function query() {
    if (utils.loadFromStorage(EMAIL_KEY )) emails = utils.loadFromStorage(EMAIL_KEY );
	return Promise.resolve(emails);
} 

function getSumUnReadEmails(){
    let unReadEmails = emails.filter(email => !email.isRead);
    return Promise.resolve(unReadEmails.length);
} 

function getEmailById(id) {
	let email = emails.find(email => email.id === id);
	return Promise.resolve(email);
}

function setEmailReadById(id) {
    query()
    .then(emails =>{
        var email
        emails.forEach(currEmail => {
            if(currEmail.id === id) email=currEmail
        })
        console.log('emails:',emails);
        email.isRead = 'true';
        utils.saveToStorage(EMAIL_KEY,emails)
        //return Promise.resolve(email);
    })   
}

function setEmailUnReadById(id) {
    let email = emails.find(email => email.id === id);
    email.isRead = 'false';
	return Promise.resolve(email);
}

function removeEmail(id) {
	return new Promise((resolve, reject)=>{
		setTimeout(() => {
			var mailIdx = mails.findIndex(mail => mail.id === id)
			mails.splice(mailIdx, 1);
			resolve()
		}, 2000);
	});
}

function saveEmail(email) {
	if (email.id) {
		var emailIdx = emails.findIndex(currMail => currMail.id === email.id);
		// Vue.js Caveat!
		emails.splice(emailIdx, 1, email)
		// mails[mailsIdx] = email;

	} else {
        email.id = utils.makeid();
        email.sentAt = utils.getTimestampDate();
		emails.push(email);
	}
    console.log('Sevice is saving the mail', email);
    utils.saveToStorage(EMAIL_KEY ,emails)
	return Promise.resolve(email);
}

function getNextEmailId(emailId) {
	var emailIdx = emails.findIndex(currMail => currMail.id === emailId);
	var nextMail= (emailIdx < emails.length-1)? emails[emailIdx+1] : emails[0] 
	return Promise.resolve(nextMail.id)
}

export default{
    emptyEmail,
    query,
    getSumUnReadEmails,
    getNextEmailId,
    removeEmail,
    saveEmail,
    getEmailById,
    setEmailReadById,
    setEmailUnReadById
}

