import {BeforeInsert, Column, Entity, Index, JoinColumn, ManyToOne, OneToMany} from "typeorm";
import {Exclude, Expose} from "class-transformer";
// import {makeId} from "@utils/helpers";
import BaseEntity from "@entities/Entity";
import User from "@entities/User";
import Post from "@entities/Post";
import Vote from "@entities/Vote";

@Entity("comment")
export default class Comment extends BaseEntity {
    @Index()
    @Column()
    identifier: string;

    @Column()
    body: string;
    @Column()
    username: string;

    @ManyToOne(() => User)
    @JoinColumn({name: "username", referencedColumnName: "username"})
    user: User;

    @Column()
    postId: number;

    @Column({nullable: true})
    public successorId?: number;

    @ManyToOne(() => Comment, (comment) => comment.id)
    @JoinColumn({name: 'successorId'})
    public successor?: Comment;


    @ManyToOne(() => Post, (post) => post.comments, {
        nullable: true
    })
    post: Post;

    @Exclude()
    @OneToMany(() => Vote, (vote) => vote.comment)
    votes: Vote[];

    // protected userVote: number;
    //
    // setUserVote(user: User) {
    //     const index = this.votes?.findIndex(v => v.username === user.username);
    //     this.userVote = index > -1 ? this.votes[index].value : 0;
    // }

    // @Expose() get voteScore(): number {
    //     const initialValue = 0;
    //     return this.votes?.reduce((previousValue, currentObject) => previousValue + (currentObject.value || 0), initialValue);
    // }
    //
    // @BeforeInsert()
    // makeId() {
    //     this.identifier = makeId(8)
    // }

}