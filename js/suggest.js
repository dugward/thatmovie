//jquery settings for the select field autocomplete. 

$(".js-example-data-ajax").select2({
    width: 'resolve',
  minimumResultsForSearch: 10,
  ajax: {
  delay: 550,
  url: 'http://api.themoviedb.org/3/search/person',
  dataType: 'json',
  contentType: "application/json",
  type: 'GET',
  data: function (params) {
  var query = {
    api_key : 'b737a09f5864be7f9f38f1d5ad71c151',
    query: params.term
  }
 return query;
},
processResults: function (data) {
    return {
        results: $.map(data.results, function (item) {
            return {
                text: item.name,
                id: item.id
            }
            
        })
    };
}
},
});