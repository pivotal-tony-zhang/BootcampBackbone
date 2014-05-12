function getApiUrl() {
	return "http://api.remix.bestbuy.com/v1/products?format=json&apiKey=tvqme7ep6mr9gmw6znbhnk8w";
}

function init() 
{
			
	Backbone.sync = function(method, model, success, error){
		success();
	}
	var Product = Backbone.Model.extend({
		defaults: {
			name : "Bicycle",
			price : "19.99"
		},
	});
	var Products = Backbone.Collection.extend({
		model: Product
	});
	var ProductView = Backbone.View.extend({
		tagName: 'li',
		events: {
			"click span.viewDescription" : "viewDescription",
			"click span.delete" : "remove"
		},
		initialize: function(){
			_.bindAll(this, 'render', 'unrender', 'viewDescription', 'remove'); 
			this.model.bind('change', this.render);
			this.model.bind('remove', this.unrender);
		},
		render: function(){
			$(this.el).html('<span style="color:black;">'+this.model.get('name')+' '+this.model.get('price')+'</span> &nbsp; &nbsp; <span class="viewDescription" style="font-family:sans-serif; color:blue; cursor:pointer;">[View Description]</span> <span class="delete" style="cursor:pointer; color:red; font-family:sans-serif;">[delete]</span>');
			return this;
		},
		unrender: function(){
			$(this.el).remove();
		},
		viewDescription: function(){
			
		},
		remove: function(){
			this.model.destroy();
		}
	});
	var ProductsListView = Backbone.View.extend({
		el: $('body'),
		events: {
			'click button#add': 'addItem'
		},
		initialize: function(){
			_.bindAll(this, 'render', 'addItem', 'appendItem');
			this.collection = new Products();
			this.collection.bind('add', this.appendItem);
			this.counter = 0;
			this.render();
		},
		render: function(){
			var self = this;
			$(this.el).append("<button id='add'>Add list item</button>");
			$(this.el).append("<ul></ul>");
			_(this.collection.models).each(function(product){
				self.appendItem(product);
			}, this);
		},
		addItem: function(){
			this.counter++;
			var product = new Product({price: "$" + (1000 + Math.round(Math.random()*1000))/100});
			product.set({
				name: product.get('name') + " " + this.counter
			});
			this.collection.add(product);
		},
		appendItem: function(product){
			var productView = new ProductView({
				model: product
			});
			$('ul', this.el).append(productView.render().el);
		}
	});
	var productsListView = new ProductsListView();
}

