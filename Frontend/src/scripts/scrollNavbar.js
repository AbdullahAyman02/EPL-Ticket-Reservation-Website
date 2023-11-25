const scrollNavbar = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    document.getElementById("navbar").classList.add("sticky");
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").classList.remove("sticky");
    document.getElementById("navbar").style.top = "-50px";
  }
};

export default scrollNavbar;
