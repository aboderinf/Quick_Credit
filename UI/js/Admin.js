

const modalSpecific = document.getElementById("modalSpecific");
const modalCurrent = document.getElementById("modalCurrent");
const modalRepaid = document.getElementById("modalRepaid");
const modalPost = document.getElementById("modalPost");

const display = (id) => {
	id.style.display = "block";
};

const displayOff = (id) => {
	id.style.display = "none";
};



const open = document.getElementById('openBtn');
const close = document.getElementById('closeBtn');

function toggleSideNav(width) {
  document.getElementById('mySidenav').style.width = width;
  document.getElementById('container').style.marginLeft = width;
}

open.onclick = () => {
  toggleSideNav('250px');// 0,0,0,0.4
};

close.onclick = () => {
  toggleSideNav('0');
};

window.onclick = (event) => {
  if (event.target !== open) {
    toggleSideNav('0');
  }
};
