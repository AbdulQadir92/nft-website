// @ts-nocheck
import { TopCollectionsStyled, CardsContainer, Card, ImageContainer, CardBody, Floor, Volume, ButtonContainer } from "../../styles/components/home/TopCollections"
import { ButtonStyled } from "../../styles/components/common/Button"
import { useEffect } from "react"
import CONTENT from "../../utils/content"
import { useNavigate } from "react-router-dom"
import { Link } from "react-router-dom"
import TopCollectionsLoader from "./loaders/TopCollectionsLoader"

import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../store/store"
import { getTopCollections } from "../../store/collectionsSlice"



const TopCollections = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch<AppDispatch>();
    const { data, loading } = useSelector((state: RootState) => state.collections);

    useEffect(() => {
        dispatch(
            getTopCollections()
        )
    }, [])

    const navigateToCollection = (item: any) => {
        navigate(`/collections/${item.contracts[0].contract_address}`)
    }


    return (
        <TopCollectionsStyled>
            <h1>{CONTENT.home.topCollectionsSection.heading}</h1>
            <CardsContainer>
                {loading ? <TopCollectionsLoader /> : (
                    <>
                        {data.results.map((item: any, index: number) => (
                            <Card key={index} onClick={() => navigateToCollection(item)}>
                                <ImageContainer>
                                    <img src={item.image_url} alt="..." />
                                </ImageContainer>
                                <CardBody>
                                    <h2>{item.name}</h2>
                                    <div>
                                        <Floor>
                                            <h3>Floor Price</h3>
                                            <p>{item.stats.one_day_volume.toFixed(2)} {data.chain}</p>
                                        </Floor>
                                        <Volume>
                                            <h3>Total Volume</h3>
                                            <p>{item.stats.total_volume.toFixed(2)} {data.chain}</p>
                                        </Volume>
                                    </div>
                                </CardBody>
                            </Card>
                        ))}
                    </>
                )}
            </CardsContainer>
            <ButtonContainer>
                <ButtonStyled>
                    <Link to="#">All Collections</Link>
                </ButtonStyled>
            </ButtonContainer>
        </TopCollectionsStyled>
    )
}

export default TopCollections