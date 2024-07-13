// Allow `cargo stylus export-abi` to generate a main function.
#![cfg_attr(not(feature = "export-abi"), no_main)]
extern crate alloc;

/// Use an efficient WASM allocator.
#[global_allocator]
static ALLOC: mini_alloc::MiniAlloc = mini_alloc::MiniAlloc::INIT;

use alloc::vec;
use alloy_primitives::{Address, FixedBytes, U256};
use alloy_sol_types::sol;

use stylus_sdk::prelude::*;

sol_storage! {
    #[entrypoint]
    pub struct Gamer {
        address user;
        Scores scores;
    }

    pub struct Scores {
        Score[] scores;
    }

    pub struct Score {
        uint256 score;
        uint256 time_to_score;
    }
}

#[external]
impl Score {
    pub fn get_score(&self) -> U256 {
        self.score.get()
    }

    pub fn get_time_to_score(&self) -> U256 {
        self.time_to_score.get()
    }
}

#[external]
impl Scores {
    pub fn add_score(&mut self, score: StorageUint<U256>, time_to_score: StorageUint<U256>) {
        self.scores.push(Score {
            score,
            time_to_score,
        });
    }
}

#[external]
impl Gamer {}
