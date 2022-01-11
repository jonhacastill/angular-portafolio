import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {

  cargando = true;
  producto: Producto[] = [];
  productoFiltrado: Producto[] = [];

  constructor( private http: HttpClient) { 
    this.cargarProducto();
  }

  private cargarProducto(){
    return new Promise<void> ( (resolve, reject) => {
      this.http.get('https://angular-html-cj-default-rtdb.firebaseio.com/productos_idx.json')
      .subscribe( (resp: any) => {
        this.producto = resp;
        this.cargando = false;
        resolve();
      });
    });
    
  }

  getProducto (id: string){
    return this.http.get(`https://angular-html-cj-default-rtdb.firebaseio.com/productos/${id}.json`);
  }

  buscarProducto ( termino: string){
    
    if (this.producto.length === 0){
      this.cargarProducto().then(()=>{
        this.filtrarProductos(termino);
      })
    }else{
      this.filtrarProductos(termino);
    }
    
    // this.productoFiltrado = this.producto.filter( producto => {
    //   return true;
    // });
    // console.log(this.productoFiltrado);
  }

  private filtrarProductos( termino: string){
    // console.log(this.producto);
    this.productoFiltrado = [];
    termino = termino.toLocaleLowerCase();
    this.producto.forEach( prod => {
      const tituloLower = prod.titulo.toLocaleLowerCase();
      if(prod.categoria.indexOf(termino) >= 0 || tituloLower.indexOf(termino) >= 0){
        this.productoFiltrado.push(prod);
      }
    });
  }

}
