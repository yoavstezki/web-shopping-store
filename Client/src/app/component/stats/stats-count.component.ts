import {Component, OnInit} from '@angular/core';
import {productCatStats} from './productCatStats';
import {ProductService} from '../../service/product.service';

// @ts-ignore
const d3 = require('d3');
// @ts-ignore
const d3Scale = require('d3-scale');
// @ts-ignore
const d3Array = require('d3-array');
// @ts-ignore
const d3Axis = require('d3-axis');

@Component({
  selector: 'app-stats-count',
  template: `
    <h1>{{title}}</h1>
    <h2 class="page-header">{{subtitle}}</h2>
    <svg width="960" height="500"></svg>
  `
})
export class StatsCountComponent implements OnInit {

  title = 'Products AVG Price by Category';
  subtitle = 'Bar Chart';
  stat: productCatStats;
  private width: number;
  private height: number;
  private margin = {top: 20, right: 20, bottom: 30, left: 40};
  private x: any;
  private y: any;
  private svg: any;
  private g: any;
  private Stats: any[] = [];

  constructor(private productService: ProductService) {
  }

  ngOnInit() {

    let i: number = 0;
    let json = {};
    this.productService.categoryAvg()
      .subscribe((data: any) => {
        for (let stat of data.callback) {
          stat = new productCatStats(stat._id, stat.count);
          json = JSON.parse(JSON.stringify(stat));
          console.log(stat);
          this.Stats.push(json);
          i++;
        }

        this.initSvg();
        this.initAxis();
        this.drawAxis();
        this.drawBars();
      });


  }

  private initSvg() {
    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width') - this.margin.left - this.margin.right;
    this.height = +this.svg.attr('height') - this.margin.top - this.margin.bottom;
    this.g = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');
  }

  private initAxis() {
    this.x = d3Scale.scaleBand().rangeRound([0, this.width]).padding(0.1);
    this.y = d3Scale.scaleLinear().rangeRound([this.height, 0]);
    this.x.domain(this.Stats.map((d) => d._id));
    this.y.domain([0, d3Array.max(this.Stats, (d) => d.count)]);
    //this.y.domain([0, 600]);
  }

  private drawAxis() {
    this.g.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.height + ')')
      .call(d3Axis.axisBottom(this.x));
    this.g.append('g')
      .attr('class', 'axis axis--y')
      .call(d3Axis.axisLeft(this.y))
      .append('text')
      .attr('class', 'axis-title')
      .attr('transform', 'rotate(-90)')
      .attr('y', 6)
      .attr('dy', '0.71em')
      .attr('text-anchor', 'end')
      .text('Frequency');
  }

  private drawBars() {

    let number = Math.random() * (100 - 1) + 1;


    this.g.selectAll('.bar')
      .data(this.Stats)
      .enter().append('rect')
      .attr('class', 'bar')
      .attr('x', (d) => this.x(d._id))
      .attr('y', (d) => number)
      .attr('width', this.x.bandwidth())
      .attr('height', (d) => this.height - number)
      .attr('stroke', 'black')
      .attr('fill', 'grey');
  }

}
