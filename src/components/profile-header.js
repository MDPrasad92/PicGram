import React from 'react';

export const AppProfileHeader = ({mostLiked, mostCommented, searchImages}) => {
    return <>
        <div className="header-bar">
            <div className="header-text">
                Imaginary
                </div>
            <div className="header-search-bar">
                <div className="row">
                    <div className="col m2">
                        <p></p>
                        <span onClick={() => mostLiked()} className="most-liked">Most liked</span>
                    </div>
                    <div className="col m2">
                        <p></p>
                        <span onClick={() => mostCommented()} className="most-liked">Most commented</span>
                    </div>
                    {/* <div className="col m2">
                        <p></p>
                        <a onClick={()=>this.normal()} className="most-liked">Normal</a>
                    </div> */}
                    <div className="col m8">
                        <input type="text" onChange={(e) => searchImages(e)} className="header-textbox" placeholder="Search Images" />
                    </div>
                </div>
            </div>
        </div>
    </>
 }