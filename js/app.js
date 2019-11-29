'use strict';
// console.log("I am loaded");

var Item = function(data){ // function(data){this.image_url = data.image_url;}
  this.imageUrl = data.image_url;
  this.title = data.title;
  this.description = data.description;
  this.keyword = data.keyword;
  this.horns = data.horns;
  Item.all.push(this);
};

Item.all = [];


Item.prototype.render = function() {

  let hornOutput = $('<div></div>');
      hornOutput.addClass(this.keyword);

  // clone (copy) the html from inside the photo-template
  let template = $('#photo-template').html();

  // Add the template to the output div
  hornOutput.html( template );

  let itemClone = hornOutput.clone();
  itemClone.find('h2').text(this.title);
  itemClone.find('img').attr('src', this.imageUrl);
  itemClone.find('p').text(this.description);
  $('main').append(itemClone);
};

function populateSelectBox() {
  let seen = {};
  let select = $('select');
  Item.all.forEach( (pic) => {
    if ( ! seen[pic.keyword] ) {
      let option = `<option value="${pic.keyword}">${pic.keyword}</option>`;
      select.append(option);
      seen[pic.keyword] = true;
    }
  });
}

$('select').on('change', function() {
  let selected = $(this).val();
  $('div').hide();
  $(`.${selected}`).fadeIn(800);
});

$.get('./data/page-1.json')
  .then( data => {
    data.forEach( (value) => {
      let box = new Item(value);
      box.render();
    });
  })
  .then( () => populateSelectBox() );


