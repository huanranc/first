window.onload=function(){
    var width=650;
    var height=300;

    var padding={top:50,right:50,bottom:50,left:50};

    var dataset=[[1,120],[2,60],[3,120],[4,180],[5,120]];

    //找出最大值和最小值必须用到d3.min  d3.max
    var min=d3.min(dataset,function(d){
        return d[1];
    })
    var max=d3.max(dataset,function(d){
        return d[1];
    })

    var xScale=d3.scaleLinear()
                .domain([0.5,5])
                .range([0,width-padding.left-padding.right]);
                
    var yScale=d3.scaleLinear()
                .domain([0,max])
                .range([height-padding.top-padding.bottom,0])

    var svg=d3.select('.lineChart svg')
                .attr('width',width+'px')
                .attr('height',height+'px');
//调用X轴
    var xAxis=d3.axisBottom()
                .scale(xScale)
                .ticks(5);
//同理
    var yAxis=d3.axisLeft()
                .scale(yScale);

    svg.append('g')
        .attr('class','axis')
        .attr('transform','translate('+padding.left+','+(height - padding.bottom) + ')')
        .call(xAxis);
    
    svg.append('g')
        .attr('class','axis')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .call(yAxis);
        
    var linePath=d3.line()
                    .x(function(d){
                        return xScale(d[0])
                    })
                    .y(function(d){
                        return yScale(d[1]);
                    })
    
    svg.append('g')
        .append('path')
        .attr('class','line-path')
        .attr('transform', 'translate(' + padding.left + ',' + padding.top + ')')
        .attr('d',linePath(dataset))
        .attr('fill','none')
        .attr('stroke-width',4)
        .attr('stroke','#4dbac0');

    svg.append('g')
        .selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('r',5)
        .attr('transform',function(d){
            return 'translate('+(xScale(d[0])+padding.left)+','+(yScale(d[1])+padding.top)+')'
        })
        .attr('fill','white')
        .attr('stroke-width',4)
        .attr('stroke','#4dbac0');
    

}