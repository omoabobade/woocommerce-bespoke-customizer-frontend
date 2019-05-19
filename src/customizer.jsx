'use strict';

const e = React.createElement;

class Customizer extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {items:[], categories:[], category:{}, labels:[], data:{} }
        this.fetchCategories = this.fetchCategories.bind(this);
        this.fetchLabels = this.fetchLabels.bind(this);
        this.fetchItems();
    }

    //activeDomain = "http://localhost/wordpress/";
    activeDomain = "https://www.marcomartinez.clothing/demo/";

    componentDidMount(){
       
    }

    fetchItems(){
        fetch(this.activeDomain+"?api_request=fetchItems", {method: 'get'}).then(
            function(response){
                return response.json();
            }
        ).then(items=>{
            this.setState({items});
        })
    }
    
    fetchCategories = itemId => e=>{

        fetch(this.activeDomain+"?api_request=fetchCategories&itemId="+itemId, {method: 'get'}).then(
            function(response){
                return response.json();
            }
        ).then(categories=>{
            this.setState({categories});
        })
    }

    fetchLabels = catId =>e =>{
        const categories = this.state.categories;
        const category = categories.filter(cat=> cat.id==catId)[0];
        this.setState({category});
        fetch(this.activeDomain+"?api_request=fetchLabels&catId="+catId, {method: 'get'}).then(
            function(response){
                return response.json();
            }
        ).then(labels=>{
            this.setState({labels});
        })
    }

    setSelected = title => e =>{
        let data = this.state.data;
        data[[this.state.category.title]] = title;
        this.setState({data, parsedData: JSON.stringify(data)});
    }


    saveCustomizer = e =>{
        document.getElementById("exampleModalLong").classList.remove('show');
        document.getElementById("backdrop").classList.remove('show')
        document.getElementById("backdrop").style.removeProperty( 'display' );
        e.target.form.submit();
        //const bespoke_customization = this.state.data;
        

       
    }

    parseCategories(id){
       return  this.state.categories.map((category)=>{
         return  (id == category.item_id)?
        <div className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
            <div className="card-body">
                <div className="card" key={category.id.toString()} >
                    <div className="card-header" id="headingOne">
                        <h5 className="mb-0">
                            <button className="btn btn-link" onClick={this.fetchLabels(category.id)} type="button" aria-expanded="true" aria-controls="collapseOne">
                                {category.title}
                            </button>
                        </h5>
                    </div>
                    {this.parseLabels(category.id)}    
                </div>  
            </div>
        </div>:""})
    }

    parseLabels(id){
        if(this.state.labels.length == 0) return;
        const figures = this.state.labels.map(label=>{
               return (label.category_id == id)?
                    this.parseFigures(label)
                        :
                    ""
                }
        );
        if(!figures['0'])return;
        return <div className="collapse show" aria-labelledby="headingOne">
                           <div className="card-body">
                                <p>
                                    {this.state.category.details}
                                </p>
                                <div>
                                    {figures}
                                </div>
                            </div>  
                       </div>
    }

    parseFigures(label){
        const selected = ((typeof this.state.data[[this.state.category.title]] !== undefined) && this.state.data[[this.state.category.title]] == label.title)? true: false;
        return <figure className={(selected)? "figure fon": "figure "} style={{width:"22%", padding:"2%"}} onClick={this.setSelected(label.title)}>
            <img src={label.picture} className="figure-img img-fluid rounded" alt={label.title} />
            <figcaption className="figure-caption">
                {label.title} 
            {

                (selected)?<span className="oi oi-check" style={{float:"right"}} title="icon check" aria-hidden="true"></span>: ""
            }
            </figcaption>
        </figure>
    }

    render(){
        return (
            <div id="exampleModalLong" className="modal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" style={{ paddingLeft: "0px;"}}>
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title"> Your Customization : <span id="bespoke_product_title"></span></h5>
                            <div className="row">
                                <div className="col-3">
                                    <img id="bespoke_img_src" src="" width="50px" style={{float:"left"}} />
                                </div>
                                <div className="col-8">
                                    <h6 id="bespoke_product_price"></h6>
                                </div>
                            </div>
                            <button type="button" className="close modal-close" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <button type="button" className="btn btn-secondary save-btn btn-sm btn-block" data-id="" onClick={this.saveCustomizer}>Save Customization</button>
                            <input type="hidden" name="bespoke_customization" value={this.state.parsedData}/>
                            <div className="row">
                                <div className="col-12">
                                    <div className="accordion">
                                    {
                                      this.state.items.map((item)=> <div className="card"  id="parentCard" key={item.id.toString()} onClick={this.fetchCategories(item.id)} >
                                            <div className="card-header">
                                                <h5 className="mb-0">
                                                    <button className="btn btn-link" type="button" aria-expanded="true" aria-controls="collapseOne">
                                                        {item.title}
                                                    </button>
                                                </h5>
                                            </div>
                                            {this.parseCategories(item.id) }
                                        </div>)
                                    }
                                    </div>
                                </div>
                            </div>
                            <button type="button" className="btn btn-secondary save-btn btn-sm btn-block" data-id="" onClick={this.saveCustomizer}>Save Customization</button>
                        </div>
                    </div>
                </div>
                </div>
        )
    }

}



const domContainer = document.querySelector('#customizer_container');
ReactDOM.render(e(Customizer), domContainer);