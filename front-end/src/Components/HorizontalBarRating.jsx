import React from 'react';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory';

export const HonrizontalBarRating = ({ data }) => {

    return (
        <VictoryChart
            domainPadding={20}
            height={500}  // Increased height
            width={800}
            padding={{ top: -50, bottom: 70, left: 100, right: 50 }}
        >
            <VictoryBar
                horizontal
                barWidth={40}
                data={data.map((value, index) => ({ x: index + 1, y: value }))}
                style={{ data: { fill: '#1d7ededd' } }}
            />
            <VictoryAxis
                dependentAxis
                tickValues={[0.2, 0.4, 0.6, 0.8, 1]}
                style={{
                    tickLabels: { fontSize: 46, padding: 20 }, // Adjust fontSize as needed
                    axisLabel: { fontSize: 20, padding: 20 }, // Adjust fontSize as needed
                }}
            />
            <VictoryAxis
                style={{
                    tickLabels: { fontSize: 46, padding: 20 }, // Adjust fontSize as needed
                    axisLabel: { fontSize: 20, padding: 20 }, // Adjust fontSize as needed
                }}
            />
        </VictoryChart>
    );
}
