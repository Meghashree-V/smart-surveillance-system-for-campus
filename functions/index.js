/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

admin.initializeApp();
require('dotenv').config();
sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.sendStudentInvite = functions.firestore
  .document('students/{studentId}')
  .onCreate(async (snap, context) => {
    const student = snap.data();
    if (!student.email || !student.registrationLink) return null;

    const msg = {
      to: student.email,
      from: 'YOUR_VERIFIED_SENDER@mvjce.edu.in', // Change this to your verified sender
      templateId: 'd-0830e1f6d430414c8b3488a572e5e8fc',
      dynamic_template_data: {
        student_name: student.name,
        registration_link: student.registrationLink,
      },
    };

    try {
      await sgMail.send(msg);
      console.log('Invite sent to', student.email);
      return null;
    } catch (error) {
      console.error('SendGrid error:', error);
      return null;
    }
  });
