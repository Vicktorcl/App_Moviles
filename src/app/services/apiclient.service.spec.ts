import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { APIClientService } from './apiclient.service';
import { Post } from '../model/post';


describe('Verificar funcionamiento del foro', () => {
  let service: APIClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [APIClientService]
    });
    service = TestBed.inject(APIClientService);
  });

  it('debería obtener todos los posts desde JSON Server', async () => {
    const posts = await service.fetchPosts();
    
    expect(posts).withContext('No se obtuvieron publicaciones correctamente desde el servidor JSON').toBeTruthy();
    expect(posts.length).withContext('No se encontraron publicaciones en el servidor JSON').toBeGreaterThan(0);

    const firstPost = posts[0];
    expect(firstPost).toBeDefined();
    expect(firstPost).toEqual(jasmine.objectContaining({
      id: jasmine.any(String),
      title: jasmine.any(String),
      body: jasmine.any(String),
      author: jasmine.any(String)
    }));
  });

  it('debería crear un nuevo post en JSON Server', async () => {
    debugger
    const newPost = {
      id: -1,
      title: "Publicación de Prueba",
      body: "Contenido nuevo",
      author: "Juan Pérez"
    };

    
    const createdPost = await service.createPost(newPost);
    newPost.id = createdPost!.id;
    
    expect(createdPost).toBeTruthy();

    if (createdPost){
      expect(createdPost.title).toEqual(newPost.title)
      expect(createdPost.body).toEqual(newPost.body)
      expect(createdPost.author).toEqual(newPost.author)
     alert('La publicación fue creada correctamente');
    }
    else {
      alert('la publicacion No fue creada correctamente');
    }
  });

  it('debería actualizar un post existente en JSON Server', async () => {
    const updateData = {
      id: 1,
      title: "11Publicación de Prueba Actualizada",
      body: "Contenido actualizado",
      author: "Juan Pérez"
    };
  
    const updatedPost = await service.updatePost(updateData); // Aquí usamos el id 1 como ejemplo
    
    // Aseguramos que el id en el servidor sea tratado como número o cadena
    updatedPost!.id = Number(updatedPost!.id);  // Convertimos el id a número
    
    expect(updatedPost).toEqual(jasmine.objectContaining(updateData));
  });

   it('debería eliminar un post en JSON Server', async () => {
     const deleteResponse = await service.deletePost(9); // Aquí usamos el id 10 como ejemplo
     expect(deleteResponse).toBeDefined();
     expect(deleteResponse).toBeTruthy();
   });

});
