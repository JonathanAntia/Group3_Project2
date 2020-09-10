$('#ex1').bootstrapSlider({});
function showTable (){
    const jsonfile= "../../top5hoods.json";
    d3.json(jsonfile).then(
        function(data){
            console.log(data);
        }
    )
};

showTable();