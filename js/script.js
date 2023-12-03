import { loadingIndicator, showNavMenu, generateCoffeeFact, aboutMeText } from "./functions.js";
import { getPosts } from "./api.js";
import { createPostCard, blogPostList, createDetailBlogPost } from "./posts.js";
import "./form.js";


let blogPostPage = 1;
const coffeeFacts = [
  "Approximately 400 billion cups of coffee are consumed every year.",
  "It takes 100 beans to make 1 cup of coffee.",
  "It takes 5 years for a coffee tree to mature enough to produce its first crop.",
  "Once roasted a coffee bean increases in volume but decreases in weight (Like popcorn!)",
  "Coffee consists of 98.5% water.",
  "Light-roasted coffee contains more caffeine than dark-roasted coffee.",
  "Coffee beans: While they do look a lot like beans, coffee “beans” are actually the seed, or pit, of the fruit that grows on coffee trees. Coffee trees grow small, bright red fruit called coffee cherries.",
]

createPostCard(getPosts, loadingIndicator);
blogPostList(getPosts, blogPostPage, loadingIndicator);
createDetailBlogPost(getPosts, loadingIndicator);
showNavMenu();
generateCoffeeFact(coffeeFacts);
aboutMeText();