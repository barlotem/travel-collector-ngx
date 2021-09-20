import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbColorHelper, NbThemeService } from '@nebular/theme';
import { Travel } from '../../../@core/models/Travel';
import { TravelService } from '../../../@core/utils/Travel.service';

@Component({
  selector: 'ngx-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit, OnDestroy {
  topCountriesData: any;
  byYearData: any;
  topCountriesOptions: any;
  byYearOptions: any;
  themeSubscription: any;
  travelList: Travel[];
  colors: any;
  chartjs: any;

  constructor(private theme: NbThemeService, public travelService: TravelService) {
    this.travelList = new Array<Travel>();

    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {

      this.colors = config.variables;
      this.chartjs = config.variables.chartjs;

      this.topCountriesOptions = {
        maintainAspectRatio: false,
        responsive: true,
        scales: {
          xAxes: [
            {
              display: false,
            },
          ],
          yAxes: [
            {
              display: false,
            },
          ],
        },
        legend: {
          labels: {
            fontColor: this.chartjs.textColor,
          },
        },
      };
    });

    this.byYearOptions = {
      maintainAspectRatio: false,
      responsive: true,
      legend: {
        labels: {
          fontColor: this.chartjs.textColor,
        },
      },
      scales: {
        xAxes: [
          {
            gridLines: {
              display: false,
              color: this.chartjs.axisLineColor,
            },
            ticks: {
              fontColor: this.chartjs.textColor,
            },
          },
        ],
        yAxes: [
          {
            gridLines: {
              display: true,
              color: this.chartjs.axisLineColor,
            },
            ticks: {
              fontColor: this.chartjs.textColor,
            },
          },
        ],
      },
    };
  
  }

  ngOnInit() : void{
    this.travelService.getTravelList().subscribe((result: Travel[])=> {
      this.travelList = result; 

      if (this.travelList == null ) {
        // Get from local storage
        this.travelList = JSON.parse(localStorage.getItem("travelList") || "[]") as Travel[];
      }

      this.PrepareDate();
    }); 
  }

  PrepareDate() {

    // Top countries
    const countiresLabels = [...new Set(this.travelList.map(item => item.country))];
    const countriesCount = countiresLabels.map(country => (
      this.travelList.filter(x => x.country == country).length));
    
    let countries = countiresLabels.map((x, index) => ({ country: countiresLabels[index], count: countriesCount[index]}));
    countries = countries.sort((a,b) => b.count - a.count);

    this.topCountriesData = {
      labels: countries.slice(0,5).map(x=> x.country),
      datasets: [{
        data: countries.slice(0,5).map(x=> x.count),
        backgroundColor: [this.colors.primaryLight, this.colors.infoLight, this.colors.successLight, this.colors.danger, this.colors.info]
        //backgroundColor: ['#2C699A', '#54478C', '#048BA8', '#0DB39E', '#16DB93', '#83E377', '#B9E769', '#EFEA5A', '#f1c453', '#F29E4C', '#F94144', '#F3722C', '#F8961E', '#F9C74F', '#90BE6D', '#43AA8B', '#4D908E', '#577590', '#277DA1'],
      }],
    };

    // By year
    const firstYear = 1997;
    const currentYear = new Date().getFullYear();

    let byYear = Array.from({ length: currentYear - firstYear + 1 }, (_, i) => firstYear + i).map(
      (year, index) => ({year: year, count: this.travelList.filter(y => new Date(y.date).getFullYear() == year).length, 
        kmSum: this.travelList.reduce((a,b) => new Date(b.date).getFullYear() == year ? Math.round(a + b.distanceInKm) : a, 0)}));

    this.byYearData = {
      labels: byYear.map(x=> x.year),
      datasets: [{
        data: byYear.map(x=> x.count),
        label: 'מספר טיולים',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.primaryLight, 0.8),
      }, {
        data: byYear.map(x=> x.kmSum),
        label: 'סה"כ קלומטרים',
        backgroundColor: NbColorHelper.hexToRgbA(this.colors.infoLight, 0.8),
      }],
    };
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }
}
