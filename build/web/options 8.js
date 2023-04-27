// ---------------------------------------------------------------------------------------------------------------------
// Query selectors on page load
// ---------------------------------------------------------------------------------------------------------------------

// Add an event listener to each tab to open its corresponding tab content
document.querySelectorAll('.tablinks').forEach(function (tab) {
    tab.addEventListener('click', function (e) {
        e.preventDefault();
        openTab(e, this.getAttribute('data-tab'));
    });
});

// Display the general settings when the page first loads
document.querySelector('#general').style.display = 'block';

// General settings submit button listener
document.querySelector('#general-settings-form').addEventListener('submit', function (e) {
    setPiecesSettings(e, 'save-general-settings');
}, false);

// FOR QA TESTING ONLY
document.querySelector('#dev-clear').addEventListener('click', function() {
    chrome.storage.sync.clear();
    chrome.storage.local.clear();
    window.localStorage.clear();
    console.log('Cleared storage');
}, false);


// ---------------------------------------------------------------------------------------------------------------------
// Chrome Storage API interaction
// ---------------------------------------------------------------------------------------------------------------------

// Set the saved settings for general settings
chrome.storage.sync.get('pce_settings', (result) => {
    const settings = result.pce_settings;
    if (settings !== undefined) {
        document.querySelector('#' + settings.button_location).setAttribute('checked', 'checked');
        document.querySelector('#detection-checkbox').checked = settings.safe_detection;
        document.querySelector('#min-chars').value = settings.min_chars;

        // Have to put this here because it didnt launch with the initial settings pages
        if (settings.button_color !== undefined) {
            document.querySelector('#' + settings.button_color).setAttribute('checked', 'checked');
        }

        if (settings.backtrack_limit !== undefined) {
            document.querySelector('#backtrack-limit').value = settings.backtrack_limit;
        }

        if (settings.cas_btn !== undefined) {
            document.querySelector('#' + settings.cas_btn).setAttribute('checked', 'checked');
        }
    }
});

// ---------------------------------------------------------------------------------------------------------------------
// Functions
// ---------------------------------------------------------------------------------------------------------------------

// Tab switching function
function openTab(evt, cityName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(cityName).style.display = "block";
    evt.currentTarget.className += " active";
}

// Function to save settings to chrome.storage.sync
function setPiecesSettings(e, button) {
    e.preventDefault();

    // Button placement section
    let checkedButtonVal;
    document.querySelectorAll('input[name="button-location"]').forEach(function (button) {
        checkedButtonVal = button.checked ? button.value : checkedButtonVal;
    });

    // Button color
    let buttonColor;
    document.querySelectorAll('input[name="button-color"]').forEach(function (button) {
        buttonColor = button.checked ? button.value : buttonColor;
    });

    // Copy & Save button functionality
    let copyAndSave;
    document.querySelectorAll('input[name="btn-function"]').forEach(function (button) {
        copyAndSave = button.checked ? button.value : copyAndSave;
    });

    if (copyAndSave === 'embedded-button') {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'p' && e.altKey) {
                // Add your embedded button logic here
                console.log('Embedded button pressed');
            }
        });
    } else if (copyAndSave === 'keyboard-shortcut') {
        document.addEventListener('keydown', function (e) {
            if (e.key === 'p' && e.altKey) {
                // Add your keyboard shortcut logic here
                console.log('Keyboard shortcut pressed');
            }
        });
    }
}

