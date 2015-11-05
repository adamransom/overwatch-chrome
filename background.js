/*
 * This is the simplest way to test whether a page contains a YouTube
 * video. It first checks to make sure its a YouTube domain and then
 * verifies the page contains a real video using CSS selectors.
 *
 * The CSS check is used because YouTube uses HTML5 Push State, which
 * doesn't cause the PageStateMatcher to fire again when the URL 'changes'.
 * The CSS selector portion of the matcher is fired whenever the DOM changes.
 *
 * This will only be used for now, as later we will want to check for YouTube
 * videos on any page (this will require full page permissions though).
 */
chrome.runtime.onInstalled.addListener(function() {
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [
        // Show action when a page contains a YouTube player
        new chrome.declarativeContent.PageStateMatcher({
          pageUrl: { hostContains: '.youtube.com' },
          css: [ '#player:not(.off-screen)' ]
        })
      ],
      actions: [new chrome.declarativeContent.ShowPageAction() ]
    }]);
  });
});

chrome.pageAction.onClicked.addListener(function(tab){
  // When the page action is clicked, open the video using the
  // 'overwatch://' URL scheme.
  chrome.tabs.update({ url: tab.url.replace(/http(s?)/, 'overwatch') });
});
