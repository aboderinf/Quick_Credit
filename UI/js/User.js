const tabClick = (event, buttonContent) => {

    let i, tabContent, tabs;
    tabContent = document.getElementsByClassName("tabContent");
     // Hide non active tabs
    for (i = 0; i < tabContent.length; i++) {
      tabContent[i].style.display = "none";
    }
    tabs = document.getElementsByClassName("tabs");
    for (i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace("active", "");
    }
    document.getElementById(buttonContent).style.display = "block";
    event.currentTarget.className += " active";
  }
  
  // Set id= "defaultTab" to default view
  document.getElementById("defaultTab").click();