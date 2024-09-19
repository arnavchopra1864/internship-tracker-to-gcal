function downloadAndAddToCalendar() {
  // Set up the Google Calendar API
  var calendarId = '352b2a19b81b3ea0ed52f129a580c9becb6d033dcd058188d989223b90f681ce@group.calendar.google.com';
  var calendar = CalendarApp.getCalendarById(calendarId);

  // Connect to the spreadsheet
  var spreadsheetUrl = 'https://docs.google.com/spreadsheets/d/1bD-Ibc_nmkfNgBvCV-q29xNom3GvaXgPBN90yVVOMbU/edit?gid=0#gid=0';
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

  // console.log("Companies: " + data.length)

  var now = new Date();
  var oneYearFromNow = new Date(now.getTime() + (365 * 24 * 60 * 60 * 1000));
  var events = calendar.getEvents(now, oneYearFromNow);
  var eventNames = [];
  for (var i = 0; i < events.length; i++) {
    eventNames.push(events[i].getTitle());
  }

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
      } else {
        console.log(company + " is not eligible to be added to calendar: " + status)
      }
    } else {
      console.log('Event "' + company + '" is already on your calendar.');
    }
  }
}
