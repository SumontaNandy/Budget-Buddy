<InputLabel>Select Type</InputLabel>
                    <Select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        label="Type"
                    >
                        {typeList.map((type, index) => (
                            <MenuItem value={type} key={index}>
                                {type}
                            </MenuItem>
                        ))}
                    </Select>