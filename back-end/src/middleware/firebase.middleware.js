const admin = require("firebase-admin");
const serviceAccount = require("../../serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "gs://edudb-ed4b6.appspot.com"
});

const bucket = admin.storage().bucket();

const uploadPdf = async (filename, data) => {
  const file = bucket.file(filename);
  file.save(data, {
    metadata: {
      contentType: 'application/pdf',
      resumable: false
    }
  }, (err) => {
      if (err) {
        return { success: false, message: "failed to upload" };
      }

    });

    const fileUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;

    return { success: true, url: fileUrl };
}

module.exports = {
  uploadPdf
}
