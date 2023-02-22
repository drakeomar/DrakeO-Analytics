//bind all the appropriate controller functions
//to their corresponding endpoint handlers

const ak_controller = require("./activity_keys.controller");
module.exports = (app) => {
  
  const sa_controller = require("./static_allowed.controller.js");
  const sg_controller = require("./static_general.controller.js");
  const sd_controller = require("./static_dimensions.controller.js");
  const pe_controller = require("./performance.controller.js");
  const pt_controller = require("./performance_times.controller.js");
  const am_controller = require("./activity_mouse.controller.js");
  const ap_controller = require("./activity_page.controller.js");
  const ak_controller = require("./activity_keys.controller.js");
  const ac_controller = require("./activity_click.controller.js");
  const ai_controller = require("./activity_idle.controller.js");
  const us_controller = require("./users.controller.js");
  const img_controller = require("./check_img.controller.js");
  const css_controller = require("./check_css.controller.js");
  const js_controller = require("./check_js.controller.js");
  const pi_controller = require("./pi.controller.js");
  const errors_controller = require("./errors.controller.js");
  const line_controller = require("./line.controller.js");
  const bar_controller = require("./bar.controller.js");
  let router = require("express").Router();

  /**reporting controllers */
  const chartDim_controller = require("./chart_dimensions.controller.js");
  const chartPageTraffic_controller = require("./chart_pageTraffic.controller.js");
  const chartGeneralTraffic_controller = require("./chart_generalTraffic.controller.js");
  const chartPerformance_controller = require("./chart_performance.controller.js"); 
  const chartPageLoad_controller = require("./chart_pageLoad.controller.js");
  const chartErrors_controller = require("./chart_errors.controller.js"); 
  const chartBounceRate_controller = require("./chart_bounceRate.controller.js"); 
  const chartClickKeys_controller = require("./chart_clickKeys.controller.js");

  //router.post("/login/users");
  
  //router.get("/index.html", ); 

  //reporting routes 

  router.get("/charts/activity", chartClickKeys_controller.retrieve); 

  router.get("/charts/dimensions", chartDim_controller.retrieve); 

  router.get("/charts/page-traffic", chartPageTraffic_controller.retrieve);

  router.get("/charts/general", chartGeneralTraffic_controller.retrieve);

  router.get("/charts/performance", chartPerformance_controller.retrieve); 

  router.get("/charts/page-load", chartPageLoad_controller.retrieve); 

  router.get("/charts/errors", chartErrors_controller.retrieve); 

  router.get("/charts/bounce-rate", chartBounceRate_controller.testFunction); 

  //error routes 
  router.get("/errors", errors_controller.findAll); 

  router.get("/errors/:id", errors_controller.retrieve);
  
  router.post("/errors", errors_controller.create); 

  router.post("/errors/:id", errors_controller.update); 

  router.patch("/errors/:id", errors_controller.update); 

  router.delete("/errors/:id", errors_controller.destroy); 

  //allow routes

  router.get("/check/img", img_controller.findAll);

  router.post("/check/img", img_controller.create);

  router.get("/check/css", css_controller.findAll);

  router.post("/check/css", css_controller.create);

  router.get("/check/js", js_controller.findAll);

  router.post("/check/js", js_controller.create);

  //dataviz routes

  router.get("/charts/pi", pi_controller.retrieve);

  router.get("/charts/bar", bar_controller.retrieve);

  router.get("/charts/line", line_controller.retrieve); 

  // Retrieve all static dimensions information

  router.get("/static/dimensions", sd_controller.findAll);

  router.get("/static/dimensions/:id", sd_controller.retrieve);

  router.post("/static/dimensions", sd_controller.create);

  router.post("/static/dimensions/:id", sd_controller.update);

  router.put("/static/dimensions/:id", sd_controller.update);

  router.patch("/static/dimensions/:id", sd_controller.update);

  router.delete("/static/dimensions/:id", sd_controller.destroy);

  // Retrieve all static general information

  router.get("/static/general", sg_controller.findAll);

  router.get("/static/general/:id", sg_controller.retrieve);

  router.post("/static/general", sg_controller.create);

  router.post("/static/general/:id", sg_controller.update);

  router.put("/static/general/:id", sg_controller.update);

  router.patch("/static/general/:id", sg_controller.update);

  router.delete("/static/general/:id", sg_controller.destroy);

  // Retrieve all static allowed information

  router.get("/static/allowed", sa_controller.findAll);

  router.get("/static/allowed/:id", sa_controller.retrieve);

  router.post("/static/allowed", sa_controller.create);

  router.post("/static/allowed/:id", sa_controller.update);

  router.put("/static/allowed/:id", sa_controller.update);

  router.patch("/static/allowed/:id", sa_controller.update);

  router.delete("/static/allowed/:id", sa_controller.destroy);

  // Performance Object

  router.get("/performance/object", pe_controller.findAll);

  router.get("/performance/object:id", pe_controller.retrieve);

  router.post("/performance/object", pe_controller.create);

  router.post("/performance/object:id", pe_controller.update);

  router.put("/performance/object:id", pe_controller.update);

  router.patch("/performance/object:id", pe_controller.update);

  router.delete("/performance/object:id", pe_controller.destroy);

  // Performance Times Object

  router.get("/performance/times", pt_controller.findAll);

  router.get("/performance/times/:id", pt_controller.retrieve);

  router.post("/performance/times", pt_controller.create);

  router.post("/performance/times/:id", pt_controller.update);

  router.put("/performance/times/:id", pt_controller.update);

  router.patch("/performance/times/:id", pt_controller.update);

  router.delete("/performance/times/:id", pt_controller.destroy);

  // Mouse Activity

  router.get("/activity/mouse", am_controller.findAll);

  router.get("/activity/mouse/:id", am_controller.retrieve);

  router.post("/activity/mouse", am_controller.create);

  router.post("/activity/mouse/:id", am_controller.update);

  router.put("/activity/mouse/:id", am_controller.update);

  router.patch("/activity/mouse/:id", am_controller.update);

  router.delete("/activity/mouse/:id", am_controller.destroy);

  // Keys Activity

  router.get("/activity/keys", ak_controller.findAll);

  router.get("/activity/keys/:id", ak_controller.retrieve);

  router.post("/activity/keys", ak_controller.create);

  router.post("/activity/keys/:id", ak_controller.update);

  router.put("/activity/keys/:id", ak_controller.replace);

  router.patch("/activity/keys/:id", ak_controller.update);

  router.delete("/activity/keys/:id", ak_controller.destroy);

  // Page Activity

  router.get("/activity/page", ap_controller.findAll);

  router.get("/activity/page/:id", ap_controller.retrieve);

  router.post("/activity/page", ap_controller.create);

  router.post("/activity/page/:id", ap_controller.update);

  router.put("/activity/page/:id", ap_controller.replace);

  router.patch("/activity/page/:id", ap_controller.update);

  router.delete("/activity/page/:id", ap_controller.destroy);

  // Click Activity

  router.get("/activity/click", ac_controller.findAll);

  router.get("/activity/click/:id", ac_controller.retrieve);

  router.post("/activity/click", ac_controller.create);

  router.post("/activity/click/:id", ac_controller.update);

  router.put("/activity/click/:id", ac_controller.replace);

  router.patch("/activity/click/:id", ac_controller.update);

  router.delete("/activity/click/:id", ac_controller.destroy);

  // Click Activity

  router.get("/activity/idle", ai_controller.findAll);

  router.get("/activity/idle/:id", ai_controller.retrieve);

  router.post("/activity/idle", ai_controller.create);

  router.post("/activity/idle/:id", ai_controller.update);

  router.put("/activity/idle/:id", ai_controller.replace);

  router.patch("/activity/idle/:id", ai_controller.update);

  router.delete("/activity/idle/:id", ai_controller.destroy);

  // Users

  router.get("/users", us_controller.findAll);

  router.get("/users/:id", us_controller.retrieve);

  router.post("/users", us_controller.create);

  router.post("/users/:id", us_controller.update);

  router.put("/users/:id", us_controller.update);

  router.patch("/users/:id", us_controller.update);

  router.delete("/users/:id", us_controller.destroy);

  app.use('/api', router);

  app.use('/', router);

  
};
