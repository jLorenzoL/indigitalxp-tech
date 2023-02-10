export class CustomerRequest{
    results: number
    page:number
    pageable:boolean
    customerFilter:{
        documentNumber: string
        email: string
    }
  
  
    constructor(){
      this.results = 0
      this.page = 0
      this.customerFilter={
        documentNumber: "",
        email: "",
      }
  
    }
  }