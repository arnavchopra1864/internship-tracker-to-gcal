function downloadAndAddToCalendar() {
  // Set up the Google Calendar API
  var calendarId = ;
  var calendar = CalendarApp.getCalendarById(calendarId);

  // Connect to the spreadsheet
  var spreadsheetUrl = ;
  var spreadsheet = SpreadsheetApp.openByUrl(spreadsheetUrl);
  var sheet = spreadsheet.getActiveSheet();

  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var companyIndex = headers.indexOf("Company");
  var statusIndex = headers.indexOf("Status");
  var oaDeadlineIndex = headers.indexOf("OA Deadline");
  var oaLinkIndex = headers.indexOf("OA Link");
  var interviewDateIndex = headers.indexOf("Interview Date");
  var onGCalIndex = headers.indexOf("On GCal");

  for (var i = 1; i < data.length; i++) {
    var status = data[i][statusIndex];
    var company = data[i][companyIndex];
    var onGCal = data[i][onGCalIndex];

    if (onGCal === false) {
      if (status === "Received OA") {
        var task = company + " OA due";
        var deadline = data[i][oaDeadlineIndex];
        var description = data[i][oaLinkIndex];
        var eventDate = new Date(deadline);

        if (eventDate > new Date()) {
          calendar.createEvent(task, eventDate, eventDate, {description: description});
          console.log('Added event "' + task + '" to your calendar.');
          sheet.getRange(i + 1, onGCalIndex + 1).setValue("TRUE");
        } else {
          console.log('Event "' + task + '" is in the past (' + eventDate.toDateString() +')');
        }
      } else if (status === "Received Interview") {
        var task = company + " Interview";
        var deadline = data[i][interviewDateIndex];
        var eventDate = new Date(deadline);

        if (eventDate > new Date()) {
          calendar.createEvent(task, eventDate, eventDate);
          console.log('Added event "' + task + '" to your calendar.');
          sheet.getRange(i + 1, onGCalIndex + 1).setValue("TRUE");
        } else {
          console.log('Event "' + task + '" is in the past (' + eventDate.toDateString() +')');
        }
      }
    } else {
      console.log('Event "' + company + ", " + status + '" is already on your calendar.');
    }
  }
}
