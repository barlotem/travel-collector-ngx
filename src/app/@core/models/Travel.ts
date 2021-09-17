export class Travel {
  constructor(
    public albumId: number,
    public date: Date,
    public group: string,
    public guide: string,
    public track: string,
    public distanceInKm: number,
    public keyWords: string,
    public alternative: string,
    public contry: string,
    public notes: string,
    public link: string,
    public link2: string,
    public goPlusLink: string) { }
  }