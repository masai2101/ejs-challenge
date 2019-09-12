//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const lodash = require("lodash");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";
const firstPostContent = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue at tellus quis pulvinar. Cras ornare et est non vehicula. Etiam sem tellus, efficitur ac pellentesque vitae, placerat non tortor. Duis id leo tortor. Pellentesque viverra commodo purus sit amet luctus. Mauris vehicula imperdiet tristique. Donec laoreet, sapien vulputate rhoncus varius, dolor lacus venenatis enim, eget facilisis augue nunc sagittis quam. Fusce a pharetra lorem, eu auctor quam. Quisque euismod at nibh at consequat. Sed bibendum, tellus a egestas faucibus, odio nibh consequat lectus, nec suscipit nunc urna at nisl. Aliquam sollicitudin erat et ultrices sollicitudin. Fusce posuere ipsum felis, et vehicula ipsum cursus a. Donec imperdiet, nisi et tempus vestibulum, felis lorem tincidunt lacus, in fringilla felis ligula tincidunt erat.";
const secondPostContent = "Vivamus eget tristique eros. Etiam molestie sollicitudin mi vitae suscipit. Vivamus risus metus, ultricies vel sem ac, maximus venenatis eros. Curabitur elementum et dolor at faucibus. Sed dapibus purus nibh, eu accumsan diam consequat et. Morbi quis ex vestibulum, tincidunt massa eget, venenatis massa. Etiam a dolor consectetur, ultricies orci auctor, consectetur dui. Nullam facilisis tempus sem, at sagittis enim gravida vel. Vestibulum vel ornare lectus. Morbi accumsan venenatis quam sit amet convallis. Quisque imperdiet risus lectus, scelerisque vehicula ipsum faucibus accumsan. Fusce enim sem, mattis at quam ac, vulputate rutrum lorem. Pellentesque non facilisis tortor. Mauris mollis, mi non lobortis consequat, metus purus facilisis lectus, congue luctus lorem libero quis eros.";
const thirdPostContent = "Integer maximus ligula ut rhoncus pellentesque. Ut in tempor turpis, et iaculis tortor. In hac habitasse platea dictumst. Nulla accumsan, elit maximus lacinia ultrices, libero tortor efficitur dui, ac eleifend est sapien gravida dui. Sed sit amet odio est. Morbi at arcu sapien. Praesent eu dui ac turpis auctor tristique. Aenean varius et sem sed placerat. Vivamus pharetra maximus neque eu elementum. Cras ornare rutrum sem. Curabitur sit amet felis eu dui fringilla vehicula tincidunt at tortor. Interdum et malesuada fames ac ante ipsum primis in faucibus. In eu accumsan eros. Vestibulum malesuada ligula ex, ac ornare leo venenatis sed. Vestibulum gravida lorem eu metus faucibus, vel semper nulla consectetur.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//global variable
const post1 = {title: "Day 1", content: firstPostContent};
const post2 = {title: "Day 2", content: secondPostContent};
const post3 = {title: "Day 3", content: thirdPostContent};
let posts = [post1, post2, post3];

app.get("/", function(req, res) {
  res.render("home", {
    homeStartingContent: homeStartingContent,
    posts: posts
  });
});

app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});

app.get("/compose", function(req, res) {
  res.render("compose");
});

app.post("/compose", function(req, res) {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/posts/:postName", function(req,res){
  const postName = lodash.lowerCase(req.params.postName);
  posts.forEach(function(post){
    const postTitle = lodash.lowerCase(post.title);
    if (postName === postTitle) {
      res.render("post", {post: post});
    }
  });
});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
