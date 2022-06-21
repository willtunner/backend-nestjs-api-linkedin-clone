import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FeedPostEntity } from 'src/feed/models/post.entity';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { FeedPost } from './../../models/post.interface';
import { from, Observable } from 'rxjs';

@Injectable()
export class FeedService {
  constructor(
    @InjectRepository(FeedPostEntity)
    private readonly feedPostRepository: Repository<FeedPostEntity> // diz que esse repositório é do tipo FeedPostEntity
  ) {}

  // cria um post
  createPost(feedPost: FeedPost): Observable<FeedPost> {
    return from(this.feedPostRepository.save(feedPost));
  }

  // busca todos os posts
  findAllPosts(): Observable<FeedPost[]> {
    return from(this.feedPostRepository.find());
  }

  // atualiza um post
  updatePost(id: number, feedPost: FeedPost): Observable<UpdateResult> {
    return from(this.feedPostRepository.update(id, feedPost));
  }

  // deleta um post
  deletePost(id: number): Observable<DeleteResult> {
    return from(this.feedPostRepository.delete(id));
  }

  findPosts(take = 10, skip = 0): Observable<FeedPost[]> {
    return from(
      this.feedPostRepository.findAndCount({ take, skip }).then(([posts]) => {
        return <FeedPost[]>posts;
      })
    );
  }
}
