var _ = require('lodash');

describe("TripleGenerator", function() {
  var TripleGenerator = require('../lib/TripleGenerator');
  var tripleGenerator;

  beforeEach(function() {
    tripleGenerator = new TripleGenerator();
  });

  describe("enrichDocs", function() {
    it("preserves existing json", function() {
      var docs = [
        { path: '/path-to-sample-docs/data-1.json',
          body: {"_id":"55ee5e44f77dd7dab6656cdf","index":1,"guid":"c7511a55-afb3-4476-8dd9-43c3d96fb55f","isActive":false,"balance":"$22,002.95","picture":"http://placehold.it/32x32","age":69,"eyeColor":"green","name":"Mathews Mccray","gender":"male","company":"STREZZO","email":"mathewsmccray@strezzo.com","phone":"+1 (991) 531-2420","address":"731 Brightwater Court, Fontanelle, Missouri, 6921","about":"Est minim consectetur ullamco ipsum. Veniam veniam sit qui exercitation incididunt nostrud ea esse dolore voluptate nisi. Qui anim fugiat occaecat eu minim laborum.\r\n","registered":"2015-05-14T02:28:53 -07:00","tags":["sunt","ad","et","mollit","culpa","voluptate","eiusmod"],"friends":[{"id":0,"name":"Roxie Stout"},{"id":1,"name":"Victoria Burnett"},{"id":2,"name":"Lora Glenn"}],"greeting":"Hello, Mathews Mccray! You have 1 unread messages.","favoriteFruit":"apple","location":{"latitude":22.580852,"longitude":162.44889},"docFormat":"json"}
        }
      ];
      var originalDocs = _.cloneDeep(docs);
      var enrichedDocs = tripleGenerator.enrichDocs(docs);
      expect(enrichedDocs[0]).toEqual(jasmine.objectContaining(originalDocs[0]));
    });
  });

});
