import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { giveOrChangeVote } from "../../Features/Dishes/dishesSlicer"
import VoteItem from "../VoteItem"
import './index.scss'

// this function separate ranks from the user ranks
const getRank = (props) => {
    const {id, userRanks} = props
    let rank = 0
    switch (id) {
        case userRanks['first']:
            rank = 1
            break
        case userRanks['secound']:
            rank = 2
            break
        case userRanks['thered']:
            rank = 3
            break
        default:
            break
    }
    return rank
}

// votes constant 
const voteConstents = [{id: 1, rank: 1}, {id: 2, rank:2}, {id:3, rank: 3}]

const DishItem = (props) => {
    const {dish} = props
    const {id, image, dishName, description} = dish
    const {isLogged, user, ranks} = useSelector((state) => state.dishes)
    const dispatch = useDispatch()

    let itemRank = 0

    // if user is not logged or login state is undefined it will not separate the user from ranks
    if (isLogged !== undefined && isLogged !== false){
        const userRanks = ranks[user]
        itemRank = getRank({id, userRanks})
    }
    
    // handlink on click vote button
    const onClickVote = (vote) => {
        dispatch(giveOrChangeVote({user, id, vote}))
    }

    return(
        <li className="dish-item" >
            <img src={image} alt={dishName} />
            <div><h1>{dishName}</h1><p>{description}</p></div>
            <div className="vote-section" >{voteConstents.map((each, index ) => <VoteItem vote={each} itemRank={itemRank} key={each.id} onClickVote={onClickVote} index={index} />)}</div>
        </li>
    )
}

export default DishItem