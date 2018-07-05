import makeid from './utiles-service.js';
var emails = [ {
            "id": "OXeMG",
               "subject": "unix", 
               "body": "hi", 
               "isRead": false, 
               "sentAt": 1530797138},
               {
                "id": "JYOJa",
                "subject": "js", 
                "body": "hi", 
                "isRead": false, 
                "sentAt": 1530797128},
                {
                "id": "1y0Oq",
                "subject": "css", 
                "body": "hi", 
                "isRead": true, 
                "sentAt": 1530797118},
                {
                 "id": "JYHJa",
                "subject": "css and html", 
                "body": "hi", 
                "isRead": true, 
                "sentAt": 1530797098},
                {
                "id": "1y9Oq",
                "subject": "html", 
                "body": "hi", 
                "isRead": true, 
                "sentAt": 1530797088},
            ];

function emptyMail() {
    return { 
           "id": "",
           "subject": "", 
           "body": "", 
           "isRead": false, 
            "sentAt":0
    }
}

function query() {
	return Promise.resolve(emails);
}

function geMailById(id) {
	let mail = mails.find(mail => mail.id === id);
	return Promise.resolve(book);
}

function removeMail(id) {
	return new Promise((resolve, reject)=>{
		setTimeout(() => {
			var mailIdx = mails.findIndex(mail => mail.id === id)
			mails.splice(mailIdx, 1);
			resolve()
		}, 2000);
	});
}

function saveMail(mail) {
	if (mail.id) {
		var mailIdx = mails.findIndex(currMail => currMail.id === mail.id);
		// Vue.js Caveat!
		mails.splice(mailIdx, 1, book)
		// mails[mailsIdx] = mail;

	} else {
		mail.id = makeid();
		mails.push(mail);
	}
	console.log('Sevice is saving the mail', mail);
	return Promise.resolve(mail);
}

function getNextMailId(mailId) {
	var mailIdx = mails.findIndex(currMail => currMail.id === bookMail);
	var nextMail= (mailIdx < mails.length-1)? mails[mailIdx+1] : mails[0] 
	return Promise.resolve(nextMail.id)
}

export default{
    emptyMail,
    query,
    getNextMailId,
    removeMail,
    saveMail,
    geMailById
}

