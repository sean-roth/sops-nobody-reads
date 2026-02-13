# SCORM API Reference

## Finding the API

The LMS injects a JavaScript API object into the browser window hierarchy. The SCO must find it by traversing up.

```javascript
var API = null;

function findAPI(win) {
  var attempts = 0;
  while ((!win.API) && (win.parent) && (win.parent !== win) && (attempts < 10)) {
    win = win.parent;
    attempts++;
  }
  return win.API || null;
}

function getAPI() {
  API = findAPI(window);
  if (!API && window.opener) {
    API = findAPI(window.opener);
  }
  return API;
}
```

## SCORM 1.2 Data Model

### Core Functions

| Function | Purpose | When to Call |
|----------|---------|-------------|
| `LMSInitialize("")` | Start SCORM session | Page load |
| `LMSFinish("")` | End SCORM session | Page unload / module complete |
| `LMSSetValue(key, value)` | Set a data model element | During module |
| `LMSGetValue(key)` | Get a data model element | Resume, read state |
| `LMSCommit("")` | Persist pending data | After setting values |
| `LMSGetLastError()` | Get last error code | After any call |
| `LMSGetErrorString(code)` | Human-readable error | Debugging |

### Data Model Elements

| Element | Type | Values | Notes |
|---------|------|--------|-------|
| `cmi.core.lesson_status` | string | `not attempted`, `incomplete`, `completed`, `passed`, `failed` | Primary status |
| `cmi.core.score.raw` | number | 0-100 | Quiz score |
| `cmi.core.score.min` | number | Usually `0` | Score floor |
| `cmi.core.score.max` | number | Usually `100` | Score ceiling |
| `cmi.core.lesson_location` | string | Any string (max 255 chars) | Bookmark data |
| `cmi.core.exit` | string | `""`, `suspend`, `logout` | How learner left |
| `cmi.core.session_time` | string | `HH:MM:SS` format | Time in this session |
| `cmi.suspend_data` | string | Any string (max 4096 chars) | Custom state data |

### Lesson Status Logic

```
Module opened for first time  → "incomplete"
Learner exits before quiz     → "incomplete" (with exit="suspend")
Learner completes quiz         → score >= mastery_score ? "passed" : "failed"
```

**Important:** Set `lesson_status` to `passed` or `failed`, not `completed`. The `completed` status is for modules without a mastery score. Since our modules always have quizzes with passing scores, use `passed`/`failed`.

### Session Time Tracking

```javascript
var startTime = new Date();

function getSessionTime() {
  var now = new Date();
  var elapsed = now - startTime; // milliseconds
  var hours = Math.floor(elapsed / 3600000);
  var minutes = Math.floor((elapsed % 3600000) / 60000);
  var seconds = Math.floor((elapsed % 60000) / 1000);
  return pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

function pad(n) {
  return n < 10 ? "0" + n : String(n);
}
```

## Complete Lifecycle

### 1. Initialization

```javascript
window.addEventListener('load', function() {
  var api = getAPI();
  if (api) {
    api.LMSInitialize("");
    
    // Check for resume
    var location = api.LMSGetValue("cmi.core.lesson_location");
    if (location && location !== "") {
      currentSlide = parseInt(location, 10);
    }
    
    // Set to incomplete if first visit
    var status = api.LMSGetValue("cmi.core.lesson_status");
    if (status === "not attempted" || status === "") {
      api.LMSSetValue("cmi.core.lesson_status", "incomplete");
      api.LMSCommit("");
    }
  }
});
```

### 2. Bookmark on Slide Change

```javascript
function onSlideChange(slideIndex) {
  if (API) {
    API.LMSSetValue("cmi.core.lesson_location", slideIndex.toString());
    API.LMSCommit("");
  }
}
```

### 3. Report Quiz Score

```javascript
function reportScore(score, passingScore) {
  if (API) {
    API.LMSSetValue("cmi.core.score.raw", score.toString());
    API.LMSSetValue("cmi.core.score.min", "0");
    API.LMSSetValue("cmi.core.score.max", "100");
    
    var status = score >= passingScore ? "passed" : "failed";
    API.LMSSetValue("cmi.core.lesson_status", status);
    API.LMSCommit("");
  }
}
```

### 4. Finish on Exit

```javascript
function finish(completed) {
  if (API) {
    API.LMSSetValue("cmi.core.session_time", getSessionTime());
    
    if (!completed) {
      API.LMSSetValue("cmi.core.exit", "suspend");
    } else {
      API.LMSSetValue("cmi.core.exit", "");
    }
    
    API.LMSFinish("");
  }
}

// Call on page unload
window.addEventListener('beforeunload', function() {
  finish(moduleCompleted);
});
```

## Error Codes (SCORM 1.2)

| Code | Meaning |
|------|---------|
| 0 | No error |
| 101 | General exception |
| 201 | Invalid argument |
| 202 | Element cannot have children |
| 203 | Element not an array |
| 301 | Not initialized |
| 401 | Not implemented |
| 402 | Invalid set value |
| 403 | Element is read only |
| 404 | Element is write only |

## Debugging Tips

- Always check `LMSGetLastError()` after every API call during development
- Some LMS platforms silently fail on `LMSCommit()` — verify data persists by reading it back
- SCORM Cloud's debug mode shows every API call in real time — use it
- If `findAPI()` returns null, the module is not being loaded in an LMS context (direct browser open)
- For standalone testing, create a mock API object that logs calls to console

## Mock API for Local Testing

```javascript
if (!getAPI()) {
  console.warn('SCORM API not found. Using mock API for testing.');
  API = {
    _data: {},
    LMSInitialize: function() { console.log('SCORM: Initialize'); return 'true'; },
    LMSFinish: function() { console.log('SCORM: Finish'); return 'true'; },
    LMSSetValue: function(k, v) { console.log('SCORM Set:', k, '=', v); this._data[k] = v; return 'true'; },
    LMSGetValue: function(k) { var v = this._data[k] || ''; console.log('SCORM Get:', k, '=', v); return v; },
    LMSCommit: function() { console.log('SCORM: Commit'); return 'true'; },
    LMSGetLastError: function() { return '0'; },
    LMSGetErrorString: function() { return 'No error'; },
    LMSGetDiagnostic: function() { return ''; },
  };
}
```

This mock lets you test the entire module flow in a regular browser without an LMS.
