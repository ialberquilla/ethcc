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

use ethereum_transaction::types::U256;
use num_bigint::BigEndian;
use std::convert::TryInto;

sol_storage! {
    #[entrypoint]
    pub struct Gamers {
        uint256 total_gamers;
        mapping(uint256 => address) gamers;
        mapping(address => uint256) total_gamer_entries;
        mapping(address => mapping(uint256 => uint256)) gamer_entries_scores;
        mapping(address => mapping(uint256 => uint256)) gamer_entries_time_spent;
        mapping(address => uint256) gamer_scores;
    }
}

#[external]
impl Gamers {
    pub fn get_total_gamers(&self) -> U256 {
        self.total_gamers.get()
    }

    pub fn get_total_gamer_entries(&self, gamer: Address) -> U256 {
        let entries: U256 = self.total_gamer_entries.get(gamer);
        entries
    }

    pub fn get_gamer_score(&self, gamer: Address) -> U256 {
        let score: U256 = self.gamer_scores.get(gamer);
        score
    }

    pub fn get_gamer_entry(&self, gamer: Address, index: U256) -> (U256, U256) {
        let score = self.gamer_entries_scores.get(gamer).get(index);
        let spent_time = self.gamer_entries_time_spent.get(gamer).get(index);

        (score, spent_time)
    }

    pub fn add_gamer(&mut self, gamer: Address) {
        let mut total_gamers = self.total_gamers.get();
        self.gamers.insert(total_gamers, gamer);
        self.total_gamers.set(total_gamers + U256::from(1));
    }

    pub fn add_gamer_entry(&mut self, gamer: Address, score: U256, spent_time: U256) {
        let mut total_entries = self.total_gamer_entries.get(gamer);
        self.gamer_entries_scores
            .setter(gamer)
            .insert(total_entries, score);
        self.gamer_entries_time_spent
            .setter(gamer)
            .insert(total_entries, spent_time);

        let mut total_entries = self.total_gamer_entries.setter(gamer);
        let old_total_entries = total_entries.get();
        total_entries.set(old_total_entries + U256::from(1));

        update_user_score(gamer);
    }

    pub fn update_user_score(&mut self, gamer: Address) {
        let mut total_entries = self.total_gamer_entries.get(gamer);
        let mut total_score = U256::from(0);

        for i in 0..u256_to_i64(total_entries) {
            let score = self.gamer_entries_scores.get(gamer).get(U256::from(i));
            total_score += score;
        }

        self.gamer_scores.set(gamer, total_score);
    }

    fn u256_to_i64(u256_value: U256) -> i64 {
        let mut bytes = vec![0; 8];
        u256_value.to_bytes(&mut bytes);

        let result = i64::from_ne_bytes(bytes);
        result
    }
}
