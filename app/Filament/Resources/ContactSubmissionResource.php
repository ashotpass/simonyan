<?php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactSubmissionResource\Pages;
use App\Models\ContactSubmission;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ContactSubmissionResource extends Resource
{
    protected static ?string $model = ContactSubmission::class;
    protected static ?string $navigationIcon = 'heroicon-o-envelope';
    protected static ?int $navigationSort = 5;

    public static function form(Form $form): Form
    {
        return $form->schema([
            Forms\Components\TextInput::make('name')->disabled(),
            Forms\Components\TextInput::make('email')->disabled(),
            Forms\Components\TextInput::make('phone')->disabled(),
            Forms\Components\Textarea::make('message')->disabled()->rows(8)->columnSpanFull(),
            Forms\Components\TextInput::make('ip')->disabled(),
            Forms\Components\Toggle::make('is_read'),
        ]);
    }

    public static function table(Table $table): Table
    {
        return $table->columns([
            Tables\Columns\IconColumn::make('is_read')->boolean()->label('Read'),
            Tables\Columns\TextColumn::make('name')->searchable(),
            Tables\Columns\TextColumn::make('email')->searchable(),
            Tables\Columns\TextColumn::make('phone'),
            Tables\Columns\TextColumn::make('message')->limit(60),
            Tables\Columns\TextColumn::make('created_at')->dateTime()->sortable(),
        ])
        ->defaultSort('created_at', 'desc')
        ->actions([
            Tables\Actions\ViewAction::make(),
            Tables\Actions\Action::make('toggle_read')
                ->label(fn ($record) => $record->is_read ? 'Mark unread' : 'Mark read')
                ->icon('heroicon-m-check')
                ->action(fn ($record) => $record->update(['is_read' => ! $record->is_read])),
            Tables\Actions\DeleteAction::make(),
        ]);
    }

    public static function canCreate(): bool { return false; }

    public static function getNavigationBadge(): ?string
    {
        $count = ContactSubmission::where('is_read', false)->count();
        return $count > 0 ? (string) $count : null;
    }

    public static function getNavigationBadgeColor(): ?string { return 'warning'; }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactSubmissions::route('/'),
            'view' => Pages\ViewContactSubmission::route('/{record}'),
        ];
    }
}
