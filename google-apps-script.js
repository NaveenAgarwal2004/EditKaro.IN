function doGet(e) {
    return HtmlService.createHtmlOutput("Hello, world!");
}

function doPost(e) { 
    Logger.log(e); // Log the incoming request for debugging
    // Handle form submissions
    var email = e.parameter.email; // Assuming the form has an input with name="email"
    // Add logic to process the email, e.g., save to a database or send an email
    return ContentService.createTextOutput("Form submitted successfully!");
}
