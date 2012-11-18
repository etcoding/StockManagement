using FluentValidation;

namespace StockManagement.Models.Validation
{
    public class ProductValidator : AbstractValidator<Product>
    {
        public ProductValidator(ValidateFor mode)
        {
            this.RuleFor(x => x.Name).NotEmpty();
            this.RuleFor(x => x.Categories).NotEmpty();

            if (mode == ValidateFor.Create)
                this.RuleFor(x => x.Id).Length(0);
            else
                this.RuleFor(x => x.Id).NotEmpty();
        }
    }
}